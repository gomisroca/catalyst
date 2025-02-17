import { getProject } from '@/server/queries/projects';
import Image from 'next/image';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const data = await getProject((await params).id);
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      {data.picture && <Image src={data.picture} alt="Project Picture" width={300} height={300} />}
    </div>
  );
}
