// Base Imports
import { Link } from 'react-router-dom';
// UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { BsActivity, BsFire } from 'react-icons/bs';
import { Pencil } from 'lucide-react';

export default function BranchDetails({ branch, user }: { branch: Branch; user?: BasicUser }) {
  return (
    <div className="flex items-center gap-2 px-4">
      <Avatar className="rounded-md">
        <AvatarImage className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + branch.project.avatar}`} />
        <AvatarFallback>{branch.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <CardDescription className="flex gap-1">
          {branch.author.nickname || branch.author.username}
          <Link to={`/profile/${branch.author.id}`} className="hover:text-gray-500" data-testid="author-link">
            @{branch.author.username}
          </Link>
          <span>in</span>
          <Link to={`/${branch.project.id}`} className="text-gray-500 hover:text-gray-600">
            {branch.project.name}
          </Link>
        </CardDescription>
        <CardTitle className="flex gap-2">
          {branch.name}
          {branch.trendingActivity && <BsActivity className="text-green-500" />}
          {branch.trendingPopularity && <BsFire className="text-orange-500" />}
          {user?.id === branch.author.id && (
            <Link to={`/${branch.project.id}/${branch.id}/update`}>
              <Pencil aria-label="Edit branch" className="h-4 w-4" />
            </Link>
          )}
        </CardTitle>
        <CardDescription className="flex gap-1">
          {new Date(branch.createdAt).toLocaleDateString()}•{new Date(branch.updatedAt).toLocaleDateString()}
        </CardDescription>
      </div>
    </div>
  );
}
