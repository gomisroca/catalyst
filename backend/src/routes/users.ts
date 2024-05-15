const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import formidable from 'formidable';

import { User, PrismaClient, BranchInteraction, PostInteraction } from "@prisma/client";
const prisma = new PrismaClient();

const { FRONTEND_ORIGIN } = process.env;

const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';

import { verifyUser } from '../utils/auth';
import { uploadImage } from '../utils/upload-image';
const passportGoogle = require('../utils/google-oauth2');
const passportFacebook = require('../utils/fb-oauth2');
const passportDiscord = require('../utils/discord-oauth2');

const NodeCache = require("node-cache");
const usersCache = new NodeCache({ stdTTL: 60 * 5 });

interface UserWithInteractions extends User {
    postInteractions: PostInteraction[];
    branchInteractions: BranchInteraction[];
}

router.get('/discord', passportDiscord.authenticate('discord'));
router.get('/discord/callback',
passportDiscord.authenticate('discord', { session: true }),
  async(req, res) => {
    const user: UserWithInteractions | null  = await prisma.user.findUnique({ 
        where: { 
            id: req.user.id 
        },
        include: {
            postInteractions: true,
            branchInteractions: true,
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
            postInteractions: user.postInteractions,
            branchInteractions: user.branchInteractions,
            followedBy: user.followedBy,
        },
        process.env.JWT_SECRET as jwt.Secret
    );
    console.log(access_token)
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
        include: {
            postInteractions: true,
            branchInteractions: true,
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
            postInteractions: user.postInteractions,
            branchInteractions: user.branchInteractions,
            followedBy: user.followedBy,
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
        include: {
            postInteractions: true,
            branchInteractions: true,
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
            postInteractions: user.postInteractions,
            branchInteractions: user.branchInteractions,
            followedBy: user.followedBy,
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
            include: {
                postInteractions: true,
                branchInteractions: true,
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
                    postInteractions: existingUser.postInteractions,
                    branchInteractions: existingUser.branchInteractions,
                    followedBy: existingUser.followedBy,
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
                include: {
                    postInteractions: true,
                    branchInteractions: true,
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
                    postInteractions: newUser.postInteractions,
                    branchInteractions: newUser.branchInteractions,
                    followedBy: newUser.followedBy,
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
GET - Logged User Info
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
                    postInteractions: true,
                    branchInteractions: true,
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
                    postInteractions: newUser.postInteractions,
                    branchInteractions: newUser.branchInteractions,
                    followedBy: newUser.followedBy
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

/*
POST - Get User Follows
REQ - 
RES - 200 - Multiple User Data
*/
router.get('/follows', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if (!user){
            throw new Error('No user found')
        }
        const follows: User[] | null = await prisma.user.findMany({
            where: {
                followedBy: {
                    has: user.id
                }
            },
            include: {
                projects: {
                    include: {
                        author: true,
                        permissions: true,
                    }
                },
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        project: {
                            include:{
                                permissions: true,
                            }
                        },
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                posts: {
                    include: {
                        author: true,
                        branch: {
                            include: {
                                permissions: true,
                                project: {
                                    include: {
                                        permissions: true,
                                    }
                                }
                            }
                        },
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                postInteractions: {
                    include: {
                        post: {
                            include: {
                                author: true,
                                branch: {
                                    include: {
                                        permissions: true,
                                        project: {
                                            include: {
                                                permissions: true,
                                            }
                                        }
                                    }
                                },
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
                branchInteractions: {
                    include: {
                        branch: {
                            include: {
                                author: true,
                                project: {
                                    include: {
                                        permissions: true,
                                    }
                                },
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
            }
        })

        return res.send(follows);
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
GET - Specific User Info
REQ - email, password
RES - 200 - User Data
*/
router.get('/:id', async(req: Request, res: Response) => {
    try{
        if(usersCache.has(req.params.id)){
            return res.send(usersCache.get(req.params.id))
        }
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            }, 
            include: {
                projects: {
                    include: {
                        author: true,
                        permissions: true,
                    }
                },
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        project: {
                            include:{
                                permissions: true,
                            }
                        },
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                posts: {
                    include: {
                        author: true,
                        branch: {
                            include: {
                                permissions: true,
                                project: {
                                    include: {
                                        permissions: true,
                                    }
                                }
                            }
                        },
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                postInteractions: {
                    include: {
                        post: {
                            include: {
                                author: true,
                                branch: {
                                    include: {
                                        permissions: true,
                                        project: {
                                            include: {
                                                permissions: true,
                                            }
                                        }
                                    }
                                },
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
                branchInteractions: {
                    include: {
                        branch: {
                            include: {
                                author: true,
                                project: {
                                    include: {
                                        permissions: true,
                                    }
                                },
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
            }
        })
        if (!user){
            throw new Error('No user found')
        }
        usersCache.set(req.params.id, user);
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
POST - Follow User
REQ - userId
RES - 200 - User Data
*/
router.post('/:id/follow', async(req: Request, res: Response) => {
    try{
        let user: User | null = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            }
        })
        let profile: User | null = await prisma.user.findUnique({
            where: {
                id: req.body.profileId,
            }
        })
        if (!user || !profile){
            throw new Error('No user found')
        }

        profile = await prisma.user.update({
            where: {
                id: profile.id
            },
            data: {
                followedBy:{
                    push: user.id
                }
            }
        })

        profile = await prisma.user.findUnique({
            where: {
                id: profile.id,
            }, 
            include: {
                projects: {
                    include: {
                        author: true,
                        permissions: true,
                    }
                },
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        project: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                posts: {
                    include: {
                        author: true,
                        branch: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                postInteractions: {
                    include: {
                        post: {
                            include: {
                                author: true,
                                branch: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
                branchInteractions: {
                    include: {
                        branch: {
                            include: {
                                author: true,
                                project: true,
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
            }
        })
        return res.send(profile);
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
POST - Unfollow User
REQ - userId
RES - 200 - User Data
*/
router.post('/:id/unfollow', async(req: Request, res: Response) => {
    try{
        let user: User | null = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            }
        })
        let profile: User | null = await prisma.user.findUnique({
            where: {
                id: req.body.profileId,
            }
        })
        if (!user || !profile){
            throw new Error('No user found')
        }
        const removedProfileArray = profile.followedBy.filter(e => e !== user.id);

        profile = await prisma.user.update({
            where: {
                id: profile.id
            },
            data: {
                followedBy: removedProfileArray
            }
        })

        profile = await prisma.user.findUnique({
            where: {
                id: profile.id,
            }, 
            include: {
                projects: {
                    include: {
                        author: true,
                        permissions: true,
                    }
                },
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        project: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                posts: {
                    include: {
                        author: true,
                        branch: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                postInteractions: {
                    include: {
                        post: {
                            include: {
                                author: true,
                                branch: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
                branchInteractions: {
                    include: {
                        branch: {
                            include: {
                                author: true,
                                project: true,
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                },
            }
        })
        return res.send(profile);
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