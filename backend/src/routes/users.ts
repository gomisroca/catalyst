const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import formidable from 'formidable';

import { User, Report, PrismaClient, Like, Share, Bookmark, Hidden } from "@prisma/client";
const prisma = new PrismaClient();

const { FRONTEND_ORIGIN } = process.env;

const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';

import { verifyUser } from '../utils/auth';
import { uploadImage } from '../utils/upload-image';
const passportGoogle = require('../utils/google-oauth2');
const passportFacebook = require('../utils/fb-oauth2');
const passportDiscord = require('../utils/discord-oauth2');

interface UserWithInteractions extends User {
    likes: Like[];
    shares: Share[];
    bookmarks: Bookmark[],
    reports: Report[],
    hidden: Hidden[],
}

router.get('/discord', passportDiscord.authenticate('discord'));
router.get('/discord/callback',
passportDiscord.authenticate('discord', { session: true }),
  async(req, res) => {
    const user: UserWithInteractions | null  = await prisma.user.findUnique({ 
        where: { 
            id: req.user.id 
        },
        include:{
            likes: true,
            shares: true,
            bookmarks: true,
            reports: true,
            hidden: true,
        }
    })

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            nickname: user.nickname,
            avatar: user.avatar,
            role: user.role,
            likes: user.likes,
            shares: user.shares,
            bookmarks: user.bookmarks,
            reports: user.reports,
            hidden: user.hidden,
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
    const user: UserWithInteractions | null  = await prisma.user.findUnique({ 
        where: { 
            id: req.user.id 
        },
        include:{
            likes: true,
            shares: true,
            bookmarks: true,
            reports: true,
            hidden: true,
        }
    })

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            nickname: user.nickname,
            avatar: user.avatar,
            role: user.role,
            likes: user.likes,
            shares: user.shares,
            bookmarks: user.bookmarks,
            reports: user.reports,
            hidden: user.hidden,
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
    const user: UserWithInteractions | null  = await prisma.user.findUnique({ 
        where: { 
            id: req.user.id 
        },
        include:{
            likes: true,
            shares: true,
            bookmarks: true,
            reports: true,
            hidden: true,
        }
    })

    let access_token: string = jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            nickname: user.nickname,
            avatar: user.avatar,
            role: user.role,
            likes: user.likes,
            shares: user.shares,
            bookmarks: user.bookmarks,
            reports: user.reports,
            hidden: user.hidden,
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
        const existingUser: UserWithInteractions | null  = await prisma.user.findUnique({ 
            where: { 
                email: email
            },
            include:{
                likes: true,
                shares: true,
                bookmarks: true,
                reports: true,
                hidden: true,
            }
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
                    nickname: existingUser.nickname, 
                    avatar: existingUser.avatar,
                    role: existingUser.role,
                    likes: existingUser.likes,
                    shares: existingUser.shares,
                    bookmarks: existingUser.bookmarks,
                    reports: existingUser.reports,
                    hidden: existingUser.hidden,
                },
                process.env.JWT_SECRET as jwt.Secret
            );
        } else {
            let encryptedPassword: string = await bcrypt.hash(password, 10);
            const newUser: UserWithInteractions = await prisma.user.create({ 
                data: { 
                    username: email.toLowerCase().split('@')[0],
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                },
                include:{
                    likes: true,
                    shares: true,
                    bookmarks: true,
                    reports: true,
                    hidden: true,
                }
            }); 
            access_token = jwt.sign(
                { 
                    id: newUser.id, 
                    email: newUser.email, 
                    username: newUser.username, 
                    nickname: newUser.nickname,
                    avatar: newUser.avatar,
                    role: newUser.role,
                    likes: newUser.likes,
                    shares: newUser.shares,
                    bookmarks: newUser.bookmarks,
                    reports: newUser.reports,
                    hidden: newUser.hidden,
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
        if (!user){
            throw new Error('No user found')
        }
        return res.send(user);
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

/*
POST - User Settings
REQ - username, nickname, email, avatar, password
RES - 200 - JWT with User Data
*/
router.post('/settings', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if (!user){
            throw new Error('No user found')
        }
        const form = formidable({});
        form.parse(req, async(err, fields, files) => {
            if(err){
                throw new Error(err)
            }
            console.log(files)
            const encryptedPassword: string = await bcrypt.hash(fields.password[0], 10);
            const avatar = await uploadImage('avatars', files.avatar[0], user.id)

            const newUser: UserWithInteractions = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    username: fields.username[0] ? fields.username[0] : user.username,
                    nickname: fields.nickname[0] ? fields.nickname[0] : user.nickname,
                    email: fields.email[0] ? fields.email[0] : user.email,
                    avatar: avatar,
                    password: encryptedPassword
                },
                include: {
                    likes: true,
                    shares: true,
                    bookmarks: true,
                    reports: true,
                    hidden: true,
                }
            })
            let access_token = jwt.sign(
                { 
                    id: newUser.id, 
                    email: newUser.email, 
                    username: newUser.username, 
                    nickname: newUser.nickname,
                    avatar: newUser.avatar,
                    role: newUser.role,
                    likes: newUser.likes,
                    shares: newUser.shares,
                    bookmarks: newUser.bookmarks,
                    reports: newUser.reports,
                    hidden: newUser.hidden,
                },
                process.env.JWT_SECRET as jwt.Secret
            );
            res.send({access_token})
        })
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