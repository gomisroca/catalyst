import jwt from 'jsonwebtoken';
import { getCookie } from '../utils/cookies.js';
import { sendError } from '../utils/standard-responses.js';

export const auth = async (req, res, next) => {
  try {
    const token = getCookie(req, '__catalyst__jwt');
    if (!token) {
      throw new Error('No cookie found');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', 401);
  }
};
