import { Router } from 'express';
import authRoute from './auth.routes.js';
import userRoute from './user.routes.js';
import projectRoute from './project.routes.js';
import interactionRoute from './interaction.routes.js';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/projects', projectRoute);
router.use('/interactions', interactionRoute);
// MISSING IMPLEMENTATION
// router.use('/branches', branchRouter);
// router.use('/posts', postRouter);

export default router;
