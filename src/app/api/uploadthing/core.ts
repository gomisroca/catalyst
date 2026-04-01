import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '@/server/auth';

const f = createUploadthing();

async function authMiddleware() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  if (!session?.user) throw new UploadThingError('Unauthorized');
  return { userId: session.user.id };
}

function onUploadComplete({ metadata, file }: { metadata: { userId: string }; file: { ufsUrl: string } }) {
  console.log(`Upload complete for userId: ${metadata.userId} — ${file.ufsUrl}`);
  return { uploadedBy: metadata.userId, url: file.ufsUrl };
}

export const UploadThingRouter = {
  profilePicture: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(onUploadComplete),

  projectPicture: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(onUploadComplete),

  postMedia: f({ image: { maxFileSize: '2MB', maxFileCount: 5 } })
    .middleware(authMiddleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type UploadThingRouter = typeof UploadThingRouter;
