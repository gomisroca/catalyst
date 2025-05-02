import Modal from '@/app/_components/ui/modal';
import CreatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/create/create-post-form';

export default function CreatePostModal() {
  return (
    <Modal>
      <CreatePostForm modal />
    </Modal>
  );
}
