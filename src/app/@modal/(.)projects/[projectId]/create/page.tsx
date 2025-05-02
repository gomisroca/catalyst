import Modal from '@/app/_components/ui/modal';
import CreateBranchForm from '@/app/projects/[projectId]/(branches)/create/create-branch-form';

export default function CreateBranchModal() {
  return (
    <Modal>
      <CreateBranchForm modal />
    </Modal>
  );
}
