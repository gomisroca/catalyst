const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();

import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, FRONTEND_ORIGIN } = process.env;
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';
import { verifyUser } from '../utils/auth';

// Passport
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done, err) => {
    done(err, user);
});
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: [ 'profile', 'email' ],
    state: true,
},
async(accessToken, refreshToken, profile, done) => {
    try{      
        const email = profile['_json']['email'];
        if(!email) return done(new Error('Failed to receive email from Google. Please try again.'));

        const existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(existingUser){
            if(!existingUser.googleId)[
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        googleId: profile.id
                    }
                })
            ]
            return done(null, existingUser);
        } 

        const newUser = await prisma.user.create({
            data: {
                username: profile.displayName,
                email: email,
                avatar: profile._json.picture,
                googleId: profile.id,
                google: {
                    create: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken ? refreshToken : null,
                    }
                }
            }
        })
        return done(null, newUser);
    }catch (verifyErr) {
        done(verifyErr);
    }
}
));

router.get('/auth', passport.authenticate('google'));
router.get('/callback',
  passport.authenticate('google', { session: true }),
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