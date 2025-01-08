import { Response } from 'express';

const sendError = (res: Response, message: string, statusCode: number = 500) => {
  res.status(statusCode).json({ error: message });
};

const sendSuccess = <T>(res: Response, data: T, statusCode: number = 200) => {
  res.status(statusCode).json({ data });
};

const sendNoContent = (res: Response, statusCode: number = 204) => {
  res.status(statusCode).end();
};

export { sendError, sendSuccess, sendNoContent };
