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

  getById = async (req: Request, res: Response) => {
    try {
      const post = await this.postService.findById(req.params.id);
      if (!post) return sendError(res, 'Post not found', 404);
      sendSuccess(res, post);
    } catch (error: any) {
      console.error('Failed to get post:', error);
      sendError(res, `Failed to get post: ${error.message}`);
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { branchId, userId } = req.query;
    try {
      const posts = await this.postService.findAll(branchId as string, userId as string);
      sendSuccess(res, posts);
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      sendError(res, `Failed to fetch posts: ${error.message}`);
    }
  };
}
