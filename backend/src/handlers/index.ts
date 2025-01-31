import { Router } from 'express';
import authRoute from '@/handlers/auth.routes';
import userRoute from '@/handlers/user.routes';
import projectRoute from '@/handlers/project.routes';
import interactionRoute from '@/handlers/interaction.routes';
import branchRouter from '@/handlers/branch.routes';
import postRouter from '@/handlers/post.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/projects', projectRoute);
router.use('/interactions', interactionRoute);
router.use('/branches', branchRouter);
router.use('/posts', postRouter);

export default router;
