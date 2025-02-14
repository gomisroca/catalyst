import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `catalyst_${name}`);

export const InteractionTypeEnum = ['LIKE', 'SHARE', 'BOOKMARK', 'REPORT', 'HIDE'] as const;
export type InteractionType = (typeof InteractionTypeEnum)[number];

export const interactionType = pgEnum('interaction_type', InteractionTypeEnum);

// AUTHENTICATION
export const accounts = createTable(
  'account',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    userIdIdx: index('account_user_id_idx').on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', { length: 255 }).notNull().primaryKey(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', { mode: 'date', withTimezone: true }).notNull(),
  },
  (session) => ({ userIdIdx: index('session_user_id_idx').on(session.userId) })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date', withTimezone: true }).notNull(),
  },
  (vt) => ({ compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }) })
);

// USERS
export const users = createTable('user', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date', withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
});

export const follows = createTable(
  'follow',
  {
    followerId: uuid('follower_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    followedId: uuid('followed_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followedId] }), // Composite primary key to prevent duplicates
    followerIdx: index('follower_idx').on(table.followerId),
    followedIdx: index('followed_idx').on(table.followedId),
  })
);

export const usersRelations = relations(users, ({ many }) => ({ accounts: many(accounts) }));

// POSTS
export const posts = createTable(
  'post',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }),
    content: text('content'),
    createdById: varchar('created_by', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
    branchId: uuid('branchId').references(() => branches.id, { onDelete: 'cascade' }),
    authorId: uuid('authorId').references(() => users.id),
  },
  (table) => ({
    // Single-column indexes
    createdAtIdx: index('post_created_at_idx').on(table.createdAt), // Good for time-based queries
    authorIdx: index('post_author_idx').on(table.authorId), // Good for finding posts by author

    // Multi-column index (composite)
    authorTimeIdx: index('post_author_time_idx').on(table.authorId, table.createdAt), // Good for finding author's posts in time range

    // Full-text search index
    searchIdx: index('post_search_idx').using(
      'gin',
      sql`(
        setweight(to_tsvector('english', ${table.name}), 'A') ||
        setweight(to_tsvector('english', ${table.content}), 'B')
      )`
    ), // Good for text search in post names/content
  })
);

export const postsMedia = createTable('post_media', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }),
  url: varchar('name', { length: 512 }),
  postId: uuid('postId')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
});

export const postsInteractions = createTable(
  'post_interaction',
  {
    type: interactionType('type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    postId: uuid('postId').references(() => posts.id, { onDelete: 'cascade' }),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.postId, table.type] }), // Composite primary key to prevent duplicates
    userIdx: index('post_interaction_user_idx').on(table.userId),
    postIdx: index('post_interaction_post_idx').on(table.postId),
  })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  branch: one(branches, { fields: [posts.branchId], references: [branches.id] }),
  media: many(postsMedia),
  interactions: many(postsInteractions),
}));

// BRANCHES
export const branches = createTable(
  'branch',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    description: varchar('description', { length: 512 }),
    default: boolean('default').default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
    projectId: uuid('projectId').references(() => projects.id, { onDelete: 'cascade' }),
    authorId: uuid('authorId').references(() => users.id),
  },
  (table) => ({
    // Single-column indexes
    createdAtIdx: index('branch_created_at_idx').on(table.createdAt), // Good for time-based queries
    updatedAtIdx: index('branch_updated_at_idx').on(table.updatedAt), // Good for time-based queries
    authorIdx: index('branch_author_idx').on(table.authorId), // Good for finding branches by author
    projectIdx: index('branch_project_idx').on(table.projectId), // Good for finding branches by project
    // Multi-column index (composite)
    authorTimeIdx: index('branch_author_time_idx').on(table.authorId, table.createdAt), // Good for finding author's branches in time range

    // Full-text search index
    searchIdx: index('branch_search_idx').using(
      'gin',
      sql`(
        setweight(to_tsvector('english', ${table.name}), 'A') ||
        setweight(to_tsvector('english', ${table.description}), 'B')
      )`
    ), // Good for text search in branch names/descriptions
  })
);

export const branchesPermissions = createTable(
  'branch_permissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    private: boolean('private').default(false),
    allowedUsers: varchar('allowedUsers')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    allowCollaborate: boolean('allowCollaborate').default(true),
    allowBranch: boolean('allowBranch').default(true),
    allowShare: boolean('allowShare').default(true),
    branchId: uuid('branchId')
      .notNull()
      .references(() => branches.id, { onDelete: 'cascade' })
      .unique(),
  },
  (table) => ({
    branchIdx: index('branch_permissions_branch_idx').on(table.branchId),
  })
);

export const branchesInteractions = createTable(
  'branch_interaction',
  {
    type: interactionType('type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    branchId: uuid('branchId').references(() => branches.id, { onDelete: 'cascade' }),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.branchId, table.type] }), // Composite primary key to prevent duplicates
    userIdx: index('branch_interaction_user_idx').on(table.userId),
    branchIdx: index('branch_interaction_branch_idx').on(table.branchId),
  })
);

export const branchesRelations = relations(branches, ({ one, many }) => ({
  author: one(users, { fields: [branches.authorId], references: [users.id] }),
  project: one(branches, { fields: [branches.projectId], references: [branches.id] }),
  interactions: many(branchesInteractions),
  permissions: one(branchesPermissions, { fields: [branches.id], references: [branchesPermissions.branchId] }),
}));

// PROJECTS
export const projects = createTable(
  'project',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    picture: varchar('picture', { length: 512 }),
    name: varchar('name', { length: 256 }).notNull(),
    description: varchar('description', { length: 512 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
    authorId: uuid('authorId').references(() => users.id),
  },
  (table) => ({
    // Single-column indexes
    createdAtIdx: index('project_created_at_idx').on(table.createdAt), // Good for time-based queries
    updatedAtIdx: index('project_updated_at_idx').on(table.updatedAt), // Good for time-based queries
    authorIdx: index('project_author_idx').on(table.authorId), // Good for finding projects by author
    // Multi-column index (composite)
    authorTimeIdx: index('project_author_time_idx').on(table.authorId, table.createdAt), // Good for finding author's projects in time range

    // Full-text search index
    searchIdx: index('project_search_idx').using(
      'gin',
      sql`(
      setweight(to_tsvector('english', ${table.name}), 'A') ||
      setweight(to_tsvector('english', ${table.description}), 'B')
    )`
    ), // Good for text search in project names/descriptions
  })
);

export const projectsPermissions = createTable(
  'project_permissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    private: boolean('private').default(false),
    allowedUsers: varchar('allowedUsers')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    allowCollaborate: boolean('allowCollaborate').default(true),
    allowShare: boolean('allowShare').default(true),
    projectId: uuid('projectId')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' })
      .unique(),
  },
  (table) => ({
    projectIdx: index('project_permissions_project_idx').on(table.projectId),
  })
);

export const projectsInteractions = createTable(
  'project_interaction',
  {
    type: interactionType('type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    projectId: uuid('projectId').references(() => projects.id, { onDelete: 'cascade' }),
    userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.projectId, table.type] }), // Composite primary key to prevent duplicates
    userIdx: index('project_interaction_user_idx').on(table.userId),
    projectIdx: index('project_interaction_project_idx').on(table.projectId),
  })
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  author: one(users, { fields: [projects.authorId], references: [users.id] }),
  interactions: many(projectsInteractions),
  permissions: one(projectsPermissions, { fields: [projects.id], references: [projectsPermissions.projectId] }),
}));
