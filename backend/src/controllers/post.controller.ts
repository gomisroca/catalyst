import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { PostService } from '@/services/post.service';

export class PostController {
  postService;

  constructor() {
    this.postService = new PostService();
  }

  healthCheck = (_: Request, res: Response) => {
    try {
      sendSuccess(res, 'Posts Endpoint Healthy');
    } catch (error: any) {
      console.error('Failed health check:', error);
      sendError(res, `Failed health check: ${error.message}`);
    }
  };
}
