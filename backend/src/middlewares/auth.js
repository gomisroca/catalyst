import jwt from 'jsonwebtoken';
import { getCookie } from '../utils/cookies';

export const auth = async (req, res, next) => {
  try {
    const token = getCookie('__catalyst__jwt');
    if (!token) {
      throw new Error('No cookie found');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
