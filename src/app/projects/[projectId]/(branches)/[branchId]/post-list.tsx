import { getPosts } from '@/server/queries/posts';
import Image from 'next/image';
import PostInteractionsMenu from './(posts)/(interactions)/post-interactions-menu';

export default async function PostList({ branchId }: { branchId: string }) {
  const data = await getPosts(branchId);
  if (!data) return null;
  return (
    <div className="flex flex-col gap-4">
      {data.map((post) => (
        <div
          key={post.data.id}
          className="group flex flex-col rounded-lg bg-zinc-200 drop-shadow-sm hover:drop-shadow-md dark:bg-zinc-800">
          <div className="spy-2 flex items-center justify-between rounded-t-lg bg-zinc-100 p-2 text-lg font-bold transition duration-200 ease-in-out group-hover:bg-zinc-300 dark:bg-zinc-900 group-hover:dark:bg-zinc-950">
            <h1 className="text-lg font-bold">{post.data.title}</h1>
            <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span>{post.author?.name ? post.author?.name : post.author?.email.split('@')[0]}</span>
              <span>•</span>
              <span>
                {post.data.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="flex-1 p-4" dangerouslySetInnerHTML={{ __html: post.data.content! }} />
          {post.media?.length > 0 && (
            <section className="flex flex-wrap gap-2 p-2">
              {post.media?.map((media) => (
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
          <section className="flex items-center justify-between rounded-b-lg bg-zinc-100 p-2 text-sm font-medium transition duration-200 ease-in-out group-hover:bg-zinc-300 dark:bg-zinc-900 group-hover:dark:bg-zinc-950">
            <PostInteractionsMenu postId={post.data.id} />
          </section>
        </div>
      ))}
    </div>
  );
}
