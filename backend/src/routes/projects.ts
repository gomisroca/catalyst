const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();

import { Branch, Post, PrismaClient, Project } from "@prisma/client";
import { verifyUser } from '../utils/auth';
const prisma = new PrismaClient();
import formidable from 'formidable';
import { uploadImage } from '../utils/upload-image';
import { setMetrics} from '../utils/metrics';
const { v4: uuidv4 } = require('uuid');

const NodeCache = require("node-cache");
const projectsCache = new NodeCache({ stdTTL: 60 * 5 });

/*
GET - Get All Projects
REQ - null
RES - 200 - Project Data
*/
router.get('/', async(req: Request, res: Response) => {
    try{
        if(projectsCache.has('projects')){
            return res.send(projectsCache.get('projects'))
        }
        let projects: Project[] | null = await prisma.project.findMany({
            include:{
                author: true,
                permissions: true,
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                        childBranches: {
                            include: {
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        },
                        parentBranch: true,
                        posts: {
                            include: {
                                author: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })
        if (!projects){
            throw new Error('No projects found')
        }
        
        await setMetrics(projects)

        projects = await prisma.project.findMany({
            include:{
                author: true,
                permissions: true,
                branches: {
                    include: {
                        author: true,
                        permissions: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                        childBranches: {
                            include: {
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        },
                        parentBranch: true,
                        posts: {
                            include: {
                                author: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })

        projectsCache.set('projects', projects)
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
        if(projectsCache.has(req.params.id)){
            return res.send(projectsCache.get(req.params.id))
        }
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
                        permissions: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                        childBranches: {
                            include: {
                                permissions: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        },
                        parentBranch: true,
                        posts: {
                            include: {
                                author: true,
                                interactions: {
                                    include: {
                                        user: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })
        if (!project){
            throw new Error('No project found')
        }
        projectsCache.set(req.params.id, project)
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
router.get('/branch/:branch', async(req: Request, res: Response) => {
    try{
        if(projectsCache.has(req.params.branch)){
            return res.send(projectsCache.get(req.params.branch))
        } 
        const branchId = req.params.branch;
        const branch: Branch | null = await prisma.branch.findUnique({
            where: {
                id: branchId
            },
            include: {
                author: true,
                permissions: true,
                interactions: {
                    include: {
                        user: true,
                    }
                },
                childBranches: {
                    include: {
                        permissions: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                parentBranch: true,
                posts: {
                    include: {
                        author: true,
                        interactions: {
                            include: {
                                user: true,
                            }
                        },
                    }
                },
                project:{
                    include: {
                        permissions: true,
                    }
                }
            }
        })

        if (!branch){
            throw new Error('No project found')
        }
        projectsCache.set(branchId, branch, 60)
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
            const permissions = fields.permissions[0].split(',');
            const allowedUsers = fields.allowedUsers[0].split(',');
            await prisma.permissions.create({
                data: {
                    projectId: project.id,
                    allowBranch: permissions.includes('allowBranch'),
                    allowCollaborate: permissions.includes('allowCollaborate'),
                    allowShare: permissions.includes('allowShare'),
                    private: permissions.includes('private'),
                    allowedUsers: allowedUsers.length > 0 ? allowedUsers : undefined,
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
                        branchId: branch.id,
                        allowBranch: permissions.includes('allowBranch'),
                        allowCollaborate: permissions.includes('allowCollaborate'),
                        allowShare: permissions.includes('allowShare'),
                        private: permissions.includes('private'),
                        allowedUsers: allowedUsers.length > 0 ? allowedUsers : undefined,
                    }
                })
            }
            const avatar = await uploadImage(`projects/${project.id}`, files.avatar[0], project.id);
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
interface allowedUser {
    label: string,
    value: string
}
router.post('/:project/branch', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }

        const { projectId, name, description, parentBranch, permissions, allowedUsers }: 
        { projectId: string; name: string; description: string; parentBranch: string; permissions: string[]; allowedUsers: allowedUser[] | undefined } = req.body;
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
                allowedUsers: allowedUsers ? allowedUsers.map(user => user.value) : undefined,
                allowCollaborate: permissions.includes('allowCollaborate'),
                allowBranch: permissions.includes('allowBranch'),
                allowShare: permissions.includes('allowShare'),
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

/*
POST - Create Post
REQ - content, media
RES - 200 - Post Data
*/
router.post('/branch/:branch/post', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }
        let branch: Branch | null = await prisma.branch.findUnique({
            where: {
                id: req.params.branch
            }
        })
        if(!branch){
            throw new Error('No branch found.')
        }

        const form = formidable({});
        form.parse(req, async(err, fields, files) => {
            if(err){
                throw new Error(err)
            }

            let post: Post = await prisma.post.create({
                data: {
                    content: fields.content[0],
                    branchId: branch.id,
                    authorId: user.id
                }
            })
            if(files.media){
                let mediaArray = [];
                for(const image of files.media){
                    const media = await uploadImage(`projects/${branch.projectId}/branches/${branch.id}/posts`, image, uuidv4());
                    mediaArray.push(media)
                }
                post = await prisma.post.update({
                    where: {
                        id: post.id
                    },
                    data: {
                        media: mediaArray,
                    }
                })
            }
            branch = await prisma.branch.findUnique({
                where: {
                    id: req.params.branch
                }
            })
            projectsCache.set(branch.id, branch, 60)
            return res.send(post)
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
POST - Add Branch Interaction
REQ - interaction
RES - 200
*/
router.post('/branch/:branch/interactions', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }
        const { type }: { type: string} = req.body;

        switch (type){
            case 'like':
                await prisma.branchInteraction.create({
                    data: {
                        type: 'LIKE',
                        userId: user.id,
                        branchId: req.params.branch,
                    }
                })
                break;
            case 'share':
                await prisma.branchInteraction.create({
                    data: {
                        type: 'SHARE',
                        userId: user.id,
                        branchId: req.params.branch,
                    }
                })
                break;
            case 'bookmark':
                await prisma.branchInteraction.create({
                    data: {
                        type: 'BOOKMARK',
                        userId: user.id,
                        branchId: req.params.branch,
                    }
                })
                break;
            case 'report':
                await prisma.branchInteraction.create({
                    data: {
                        type: 'REPORT',
                        userId: user.id,
                        branchId: req.params.branch,
                    }
                })
                break;
            case 'hidden':
                await prisma.branchInteraction.create({
                    data: {
                        type: 'HIDE',
                        userId: user.id,
                        branchId: req.params.branch,
                    }
                })
                break;
            default:
                throw new Error('Something went wrong')

        }
        const branch: Branch | null = await prisma.branch.findUnique({
            where: {
                id: req.params.branch,
            }, 
            include: {
                author: true,
                interactions: {
                    include: {
                        user: true,
                    }
                },
            }
        })
        res.send(branch)
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
DELETE - Remove Post Interaction
REQ - interaction
RES - 200
*/
router.delete('/branch/:branch/interactions', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }
        const { type, id }: { type: string, id?: string } = req.body;
        let interaction;
        switch (type){
            case 'like':
                interaction = await prisma.branchInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'LIKE',
                            userId: user.id,
                            branchId: req.params.branch,
                        }
                    }
                })
                break;
            case 'share':
                interaction = await prisma.branchInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'SHARE',
                            userId: user.id,
                            branchId: req.params.branch,
                        }
                    }
                })
                break;
            case 'bookmark':
                interaction = await prisma.branchInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'BOOKMARK',
                            userId: user.id,
                            branchId: req.params.branch,
                        }
                    }
                })
                break;
            case 'report':
                interaction = await prisma.branchInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'REPORT',
                            userId: user.id,
                            branchId: req.params.branch,
                        }
                    }
                })
                break;
            case 'hidden':
                interaction = await prisma.branchInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'HIDE',
                            userId: user.id,
                            branchId: req.params.branch,
                        }
                    }
                })
                break;
            default:
                throw new Error('Something went wrong')

        }
        const branch: Branch | null = await prisma.branch.findUnique({
            where: {
                id: req.params.branch,
            }, 
            include: {
                author: true,
                interactions: {
                    include: {
                        user: true,
                    }
                },
            }
        })
        res.send(branch)
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
POST - Add Post Interaction
REQ - interaction
RES - 200
*/
router.post('/post/:post/interactions', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }
        const { type }: { type: string} = req.body;

        switch (type){
            case 'like':
                await prisma.postInteraction.create({
                    data: {
                        type: 'LIKE',
                        userId: user.id,
                        postId: req.params.post,
                    }
                })
                break;
            case 'share':
                await prisma.postInteraction.create({
                    data: {
                        type: 'SHARE',
                        userId: user.id,
                        postId: req.params.post,
                    }
                })
                break;
            case 'bookmark':
                await prisma.postInteraction.create({
                    data: {
                        type: 'BOOKMARK',
                        userId: user.id,
                        postId: req.params.post,
                    }
                })
                break;
            case 'report':
                await prisma.postInteraction.create({
                    data: {
                        type: 'REPORT',
                        userId: user.id,
                        postId: req.params.post,
                    }
                })
                break;
            case 'hidden':
                await prisma.postInteraction.create({
                    data: {
                        type: 'HIDE',
                        userId: user.id,
                        postId: req.params.post,
                    }
                })
                break;
            default:
                throw new Error('Something went wrong')

        }
        const post: Post | null = await prisma.post.findUnique({
            where: {
                id: req.params.post,
            }, 
            include: {
                author: true,
                interactions: {
                    include: {
                        user: true,
                    }
                },
            }
        })
        res.send(post)
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
DELETE - Remove Post Interaction
REQ - interaction
RES - 200
*/
router.delete('/post/:post/interactions', async(req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.header('authorization'));
        if(!user){
            throw new Error('No user found')
        }
        const { type, id }: { type: string, id?: string } = req.body;
        let interaction
        switch (type){
            case 'like':
                interaction = await prisma.postInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'LIKE',
                            userId: user.id,
                            postId: req.params.post,
                        }
                    }
                })
                break;
            case 'share':
                interaction = await prisma.postInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'SHARE',
                            userId: user.id,
                            postId: req.params.post,
                        }
                    }
                })
                break;
            case 'bookmark':
                interaction = await prisma.postInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'BOOKMARK',
                            userId: user.id,
                            postId: req.params.post,
                        }
                    }
                })
                break;
            case 'report':
                interaction = await prisma.postInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'REPORT',
                            userId: user.id,
                            postId: req.params.post,
                        }
                    }
                })
                break;
            case 'hidden':
                interaction = await prisma.postInteraction.delete({
                    where: {
                        interactionId: {
                            type: 'HIDE',
                            userId: user.id,
                            postId: req.params.post,
                        }
                    }
                })
                break;
            default:
                throw new Error('Something went wrong')

        }
        const post: Post | null = await prisma.post.findUnique({
            where: {
                id: req.params.post,
            }, 
            include: {
                author: true,
                interactions: {
                    include: {
                        user: true,
                    }
                },
            }
        })
        res.send(post)
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