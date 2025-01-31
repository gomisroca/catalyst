import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { PostService } from '@/services/post.service';
import { BasicUser } from '@/schemas/UserSchema';
import parseForm from '@/utils/parse-form';
import { createPostSchema, updatePostSchema } from '@/schemas/PostSchema';

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
      const post = await this.postService.findById(req.params.id, req.user as BasicUser);
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
      const posts = await this.postService.findAll(branchId as string, userId as string, req.user as BasicUser);
      sendSuccess(res, posts);
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      sendError(res, `Failed to fetch posts: ${error.message}`);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { fields, files } = await parseForm(req);

      const postData = {
        branchId: fields.branchId[0],
        content: fields.content[0],
        media: files.media ?? [],
      };

      const validationResult = createPostSchema.safeParse(postData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.postService.create(postData, req.user as BasicUser);
      sendSuccess(res, 'Post created successfully');
    } catch (error: any) {
      console.error('Failed to create post:', error);
      sendError(res, `Failed to create post: ${error.message}`);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { fields, files } = await parseForm(req);

      const postData = {
        content: fields.content[0],
        media: files.media ?? [],
      };

      const validationResult = updatePostSchema.safeParse(postData);
      if (!validationResult.success) return sendError(res, validationResult.error.message);

      await this.postService.update(req.params.id, postData, req.user as BasicUser);
      sendSuccess(res, 'Post updated successfully');
    } catch (error: any) {
      console.error('Failed to update post:', error);
      sendError(res, `Failed to update post: ${error.message}`);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.postService.delete(req.params.id, req.user as BasicUser);
      sendSuccess(res, 'Post deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete post:', error);
      sendError(res, `Failed to delete post: ${error.message}`);
    }
  };
}
