import { z } from 'zod';

enum InteractionType {
  LIKE = 'LIKE',
  SHARE = 'SHARE',
  BOOKMARK = 'BOOKMARK',
  REPORT = 'REPORT',
  HIDE = 'HIDE',
}

const baseUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  nickname: z.string().nullable(),
  avatar: z.string(),
  role: z.string(),
});

const basePermissionSchema = z.object({
  private: z.boolean(),
  allowedUsers: z.array(z.string()),
  allowCollaborate: z.boolean(),
  allowBranch: z.boolean(),
  allowShare: z.boolean(),
});

const baseInteractionSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  type: z.nativeEnum(InteractionType),
  id: z.string(),
  userId: z.string(),
  postId: z.string().optional(),
  branchId: z.string().optional(),
});

const basePostSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  media: z.array(z.string()),
});

const baseBranchSchema = z.object({
  projectId: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  default: z.boolean(),
  popularity: z.number(),
  activity: z.number(),
  trendingActivity: z.boolean(),
  trendingPopularity: z.boolean(),
});

const baseProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  avatar: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  popularity: z.number(),
  activity: z.number(),
  trendingActivity: z.boolean(),
  trendingPopularity: z.boolean(),
});

// Now create the full schemas with relations
const UserSchema: z.ZodType<User> = baseUserSchema.extend({
  followedBy: z.array(z.string()),
  postInteractions: z.lazy(() => z.array(InteractionSchema)),
  branchInteractions: z.lazy(() => z.array(InteractionSchema)),
  projects: z.lazy(() => z.array(ProjectSchema)),
  branches: z.lazy(() => z.array(BranchSchema)),
  posts: z.lazy(() => z.array(PostSchema)),
});

const InteractionSchema = baseInteractionSchema.extend({
  user: UserSchema,
});

const PostSchema: z.ZodType<Post> = basePostSchema.extend({
  author: UserSchema,
  branch: z.lazy(() => BranchSchema),
  interactions: z.array(InteractionSchema),
});

const BranchSchema: z.ZodType<Branch> = baseBranchSchema.extend({
  project: z.lazy(() => ProjectSchema),
  author: UserSchema,
  posts: z.array(PostSchema),
  parentBranch: z.lazy(() => BranchSchema),
  childBranches: z.array(z.lazy(() => BranchSchema)),
  permissions: basePermissionSchema,
  interactions: z.array(InteractionSchema),
});

const ProjectSchema = z.object({
  ...baseProjectSchema.shape,
  author: UserSchema,
  branches: z.array(BranchSchema),
  permissions: basePermissionSchema,
});

export {
  baseUserSchema,
  basePermissionSchema,
  baseProjectSchema,
  InteractionSchema,
  PostSchema,
  BranchSchema,
  ProjectSchema,
  UserSchema,
};
