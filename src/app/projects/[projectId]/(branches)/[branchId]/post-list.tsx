import { type Prisma } from 'generated/prisma';
import Image from 'next/image';
import { type Session } from 'next-auth';
import sanitizeHtml from 'sanitize-html';

import AuthorActions from '@/app/_components/projects/author-actions';
import { getPostInteractions } from '@/server/queries/posts';

import PostInteractionsMenu from './(posts)/(interactions)/post-interaction';

type ExtendedPost = Prisma.PostGetPayload<{
  include: { media: true; author: true; interactions: { include: { user: true } } };
}>;

async function Post({
  post,
  session,
  projectId,
  branchId,
}: {
  post: ExtendedPost;
  session: Session | null;
  projectId: string;
  branchId: string;
}) {
  const interactionsData = await getPostInteractions(post.id);

  return (
    <div className="group flex flex-col rounded-lg bg-zinc-200 drop-shadow-sm hover:drop-shadow-md dark:bg-zinc-800">
      <div className="flex items-center justify-between rounded-t-lg bg-zinc-300 p-2 transition duration-200 ease-in-out group-hover:bg-white dark:bg-zinc-700 dark:group-hover:bg-black">
        <h1 className="text-lg font-bold">{post.title}</h1>
        <div className="flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <span>{post.author.name ?? post.author.email.split('@')[0]}</span>
          <span>•</span>
          <span>{post.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          {session?.user.id === post.author.id && (
            <AuthorActions type="post" projectId={post.projectId} branchId={post.branchId} postId={post.id} />
          )}
        </div>
      </div>
      <div className="flex-1 p-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content ?? '') }} />

      {post.media.length > 0 && (
        <section className="flex flex-wrap gap-2 p-2">
          {post.media.map((media) => (
            <Image
              key={media.id}
              src={media.url}
              alt={media.name}
              width={150}
              height={150}
              className="rounded-lg transition duration-200 ease-in-out group-hover:contrast-125"
            />
          ))}
        </section>
      )}

      <section className="flex items-center justify-between rounded-b-lg bg-zinc-300 p-2 text-sm font-medium transition duration-200 ease-in-out group-hover:bg-white dark:bg-zinc-700 dark:group-hover:bg-black">
        <PostInteractionsMenu
          projectId={projectId}
          branchId={branchId}
          postId={post.id}
          interactions={interactionsData.interactions}
          extraInteractions={interactionsData.extraInteractions}
          user={session?.user}
        />
      </section>
    </div>
  );
}

export default function PostList({
  posts,
  session,
  projectId,
  branchId,
}: {
  posts: ExtendedPost[];
  session: Session | null;
  projectId: string;
  branchId: string;
}) {
  if (posts.length === 0) return <p className="text-center text-zinc-500">No posts yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} session={session} projectId={projectId} branchId={branchId} />
      ))}
    </div>
  );
}
