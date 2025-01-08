import { sendError } from '@/utils/standard-responses';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  skipSuccessfulRequests: true, // Only count failed requests (optional)
  handler: (_, res: Response) => {
    sendError(res, 'Too many requests, please try again later.', 429);
  },
});

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  try {
    limiter(req, res, next);
  } catch (error: any) {
    console.log('Failed to apply rate limit:', error);
    sendError(res, `Failed to apply rate limit: ${error.message}`);
  }
};
