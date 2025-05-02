import Modal from '@/app/_components/ui/modal';
import CreateBranchForm from '@/app/projects/[projectId]/(branches)/create/page';

export default function CreateBranchModal() {
  return (
    <Modal>
      <CreateBranchForm modal />
    </Modal>
  );
}
