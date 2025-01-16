// Base Imports
import { Link } from 'react-router-dom';
// UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

export default function PostDetails({ post, user }: { post: Post; user?: BasicUser }) {
  return (
    <div className="flex items-center gap-2 px-4">
      <Avatar className="rounded-md">
        <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + post.author.avatar}`} />
        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
      </Avatar>
      <div>
        <CardDescription className="flex gap-1">
          {post.author.nickname || post.author.username}
          <Link to={`/profile/${post.author.id}`} className="hover:text-gray-500" data-testid="author-link">
            @{post.author.username}
          </Link>
          <span>in</span>
          <Link to={`/${post.branch.projectId}/${post.branch.id}`} className="text-gray-500 hover:text-gray-600">
            {post.branch.name}
          </Link>
        </CardDescription>
        <CardTitle className="flex gap-2">
          {user?.id === post.author.id && (
            <Link to={`/${post.branch.projectId}/${post.branch.id}/${post.id}/update`}>
              <Pencil aria-label="Edit post" className="h-4 w-4" />
            </Link>
          )}
        </CardTitle>
        <CardDescription className="flex gap-1">
          {new Date(post.createdAt).toLocaleDateString()}•{new Date(post.updatedAt).toLocaleDateString()}
        </CardDescription>
      </div>
    </div>
  );
}
