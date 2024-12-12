import * as jwt from 'jsonwebtoken';

export function verifyUser(authorization) {
  const token = authorization.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    return null; // Token verification failed
  }
}
