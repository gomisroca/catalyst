import { getBranchInteractions } from '@/server/queries/branches';
import Interaction from './interaction';

const COMMON_TYPES = ['LIKE', 'SHARE', 'BOOKMARK'];
const REPORT_TYPES = ['REPORT', 'HIDE'];

export default async function BranchInteractions({ branchId }: { branchId: string }) {
  const data = await getBranchInteractions(branchId);
  if (!data) return;

  return (
    <div className="flex flex-row gap-2">
      {COMMON_TYPES.map((type) => (
        <Interaction key={type} type={type as 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE'} />
      ))}
      {/* These should be hidden in an expandable section */}
      {REPORT_TYPES.map((type) => (
        <Interaction key={type} type={type as 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE'} />
      ))}
    </div>
  );
}
