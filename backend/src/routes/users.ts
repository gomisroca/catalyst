const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();

import { User, PrismaClient, Discord } from "@prisma/client";
const prisma = new PrismaClient();

const { FRONTEND_ORIGIN } = process.env;

const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';

import { verifyUser } from '../utils/auth';
const passportGoogle = require('../utils/google-oauth2');
const passportFacebook = require('../utils/fb-oauth2');
const passportDiscord = require('../utils/discord-oauth2');

router.get('/discord', passportDiscord.authenticate('discord'));
router.get('/discord/callback',
passportDiscord.authenticate('discord', { session: true }),
  async(req, res) => {
    const user: User | null  = await prisma.user.findUnique({ where: { id: req.user.id }})

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            avatar: user.avatar,
            role: user.role
        },
        process.env.JWT_SECRET as jwt.Secret
    );
    res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

router.get('/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
passportFacebook.authenticate('facebook', { session: true }),
  async(req, res) => {
    await prisma.facebook.update({
        where: {
            userId: req.user.id,
        },
        data: {
            accessToken: req.query.code
        }
    })
    const user = await prisma.user.findUnique({ where: { id: req.user.id }})

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            avatar: user.avatar,
            role: user.role
        },
        process.env.JWT_SECRET as jwt.Secret
    );
    res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

router.get('/google', passportGoogle.authenticate('google'));
router.get('/google/callback',
passportGoogle.authenticate('google', { session: true }),
  async(req, res) => {
    await prisma.google.update({
        where: {
            userId: req.user.id,
        },
        data: {
            accessToken: req.query.code
        }
    })
    const user = await prisma.user.findUnique({ where: { id: req.user.id }})

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            avatar: user.avatar,
            role: user.role
        },
        process.env.JWT_SECRET as jwt.Secret
    );
    res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

/*
POST - Register or Log in User
REQ - email, password
RES - 200 - JWT with User Data
*/
router.post('/sign-in', async(req: Request, res: Response) => {
    try{
        const { email, password }: { email: string, password: string } = req.body;

        if(!(email && password)){
            throw new Error('Input fields missing')
        }
        const existingUser: User | null = await prisma.user.findUnique({ 
            where: {
                email: email.toLowerCase(),
            },
        })
        let access_token: string;
        if (existingUser) {
            if(!existingUser.password){
                throw new Error("User hasn't set a password")
            }
            let pwdCheck: boolean = await bcrypt.compare(password, existingUser.password);
            if (!pwdCheck) {
                throw new Error("Invalid Password")
            }
            access_token = jwt.sign(
                { 
                    id: existingUser.id, 
                    email: existingUser.email, 
                    username: existingUser.username, 
                    avatar: existingUser.avatar,
                    role: existingUser.role
                },
                process.env.JWT_SECRET as jwt.Secret
            );
        } else {
            let encryptedPassword: string = await bcrypt.hash(password, 10);
            const newUser: User = await prisma.user.create({ 
                data: { 
                    username: email.toLowerCase(),
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                }
            }); 
            access_token = jwt.sign(
                { 
                    id: newUser.id, 
                    email: newUser.email, 
                    username: newUser.username, 
                    avatar: newUser.avatar,
                    role: newUser.role  
                },
                process.env.JWT_SECRET as jwt.Secret
            );
        }
        res.send({access_token});
    }catch(err){
        if(err){
            res.status(500).send({message: err.message});
        }else {
            throw new Error("An unknown error occurred");
        }
    } finally {
        await prisma.$disconnect();
    }
})

/*
GET - User Info
REQ - email, password
RES - 200 - User Data
*/
router.get('/info', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if (user){
            return res.send(user);
        }
    }catch(err){
        if(err){
            res.status(500).send(err);
        }else {
            throw new Error("An unknown error occurred");
        }
    } finally {
        await prisma.$disconnect();
    }
})
module.exports = router;