import { Router } from 'express';
import passportAuth from '../utils/passport-setup.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.get('/discord', passportAuth.authenticate('discord'));
router.get('/discord/callback', passportAuth.authenticate('discord', { session: true }), authController.callback);

router.get('/facebook', passportAuth.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passportAuth.authenticate('facebook', { session: true }), authController.callback);

router.get('/google', passportAuth.authenticate('google'));
router.get('/google/callback', passportAuth.authenticate('google', { session: true }), authController.callback);

export default router;
