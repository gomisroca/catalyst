import Modal from '@/app/_components/ui/modal';
import CreatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/create/page';

export default function CreatePostModal() {
  return (
    <Modal>
      <CreatePostForm />
    </Modal>
  );
}
