const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();

import { Branch, PrismaClient, Project } from "@prisma/client";
import { verifyUser } from '../utils/auth';
const prisma = new PrismaClient();
import formidable from 'formidable';
import { uploadImage } from '../utils/upload-image';

/*
GET - Get All Projects
REQ - null
RES - 200 - Project Data
*/
router.get('/', async(req: Request, res: Response) => {
    try{
        const projects: Project[] | null = await prisma.project.findMany({
            include:{
                author: true,
                permissions: true,
                branches: {
                    include: {
                        author: true,
                        interactions: true,
                        permissions: true,
                        posts: {
                            include: {
                                author: true,
                                interactions: true
                            }
                        }
                    }
                }
            }
        })
        if (!projects){
            throw new Error('No projects found')
        }
        return res.send(projects);
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
GET - Get Specific Project
REQ - null
RES - 200 - Project Data
*/
router.get('/:id', async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const project: Project | null = await prisma.project.findUnique({
            where: {
                id: id,
            },
            include:{
                author: true,
                permissions: true,
                branches: {
                    include: {
                        author: true,
                        interactions: true,
                        permissions: true,
                        posts: {
                            include: {
                                author: true,
                                interactions: true
                            }
                        }
                    }
                }
            }
        })
        if (!project){
            throw new Error('No project found')
        }
        return res.send(project);
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
GET - Get Specific Branch
REQ - null
RES - 200 - Branch Data
*/
router.get('/:project/branch/:branch', async(req: Request, res: Response) => {
    try{
        const branchId = req.params.branch;
        const branch: Branch | null = await prisma.branch.findUnique({
            where: {
                id: branchId
            },
            include: {
                author: true,
                interactions: true,
                permissions: true,
                posts: {
                    include: {
                        author: true,
                        interactions: true
                    }
                }
            }
        })
        if (!branch){
            throw new Error('No project found')
        }
        return res.send(branch);
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
POST - Create Project
REQ - name, description, avatar, branchName?, branchDescription?
RES - 200 - Project Data
*/
router.post('/', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }

        const form = formidable({});
        form.parse(req, async(err, fields, files) => {
            if(err){
                throw new Error(err)
            }

            let project: Project = await prisma.project.create({
                data: {
                    name: fields.name[0],
                    description: fields.description[0],
                    authorId: user.id
                }
            })
            await prisma.permissions.create({
                data: {
                    projectId: project.id
                }
            })
            if(fields.branchName){
                const branch: Branch = await prisma.branch.create({
                    data: {
                        name: fields.branchName[0],
                        description: fields.branchDescription[0],
                        authorId: user.id,
                        default: true,
                        projectId: project.id
                    }
                })
                await prisma.permissions.create({
                    data: {
                        branchId: branch.id
                    }
                })
                await prisma.interactions.create({
                    data: {
                        branchId: branch.id
                    }
                })
            }
            const avatar = await uploadImage('projects', files.avatar[0], project.id);
            project = await prisma.project.update({
                where: {
                    id: project.id
                },
                data: {
                    avatar: avatar,
                }
            })
            return res.send(project)
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
POST - Create Branch
REQ - name, description, parentBranch, permissions, projectId
RES - 200 - Project Data
*/
router.post('/:project/branch', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }

        const { projectId, name, description, parentBranch, permissions }: 
        { projectId: string; name: string; description: string; parentBranch: string; permissions: string[]; } = req.body;
        if(!(projectId && name && description && parentBranch && permissions)){
            throw new Error('Invalid inputs')
        }

        const project: Project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })
        if(!project){
            throw new Error('No project found')
        }

        const branch: Branch = await prisma.branch.create({
            data: {
                name: name,
                description: description,
                authorId: user.id,
                parentBranchId: parentBranch == 'none' ? null : parentBranch,
                projectId: projectId
            }
        })
        await prisma.permissions.create({
            data: {
                private: permissions.includes('private'),
                allowCollaborate: permissions.includes('allowCollaborate'),
                allowBranch: permissions.includes('allowBranch'),
                allowShare: permissions.includes('allowShare'),
                branchId: branch.id
            }
        })
        await prisma.interactions.create({
            data: {
                branchId: branch.id
            }
        })

        return res.send(branch)
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