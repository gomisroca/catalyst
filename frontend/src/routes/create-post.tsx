// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostData, createPostSchema } from '@/api/schemas/PostSchema';
// Hook Imports
import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useForm } from 'react-hook-form';
// UI Imports
import { Button } from '@/components/ui/button';
import Error from '@/components/ui/error';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/loading';

export default function CreatePost() {
  const { data: user, isLoading: userPending, error: userError } = useGetSelf();

  // Create post mutation
  const {
    mutate: createPost,
    isPending: createPending,
    isSuccess: createSuccess,
    error: createError,
  } = useCreatePost();

  // Init form with default values
  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
    },
  });

  // On submit, pass the data as FormData
  async function onSubmit(values: CreatePostData) {
    if (!user) return;
    console.log(values);

    const data = new FormData();
    data.append('content', values.content);
    if (values.media) data.append('media', values.media);

    createPost(data);
  }

  if (userPending) return <Loading />;
  if (userError) return <Error message={userError.message} />;
  if (!user) return <Error message="You must be logged in to create a post." />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Media</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Media"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={createPending}>
          {createPending ? 'Creating...' : 'Submit'}
        </Button>
        {createError && (
          <p className="mt-2 text-red-500" role="alert">
            {createError.message}
          </p>
        )}
        {createSuccess && (
          <p className="mt-2 text-green-500" role="alert">
            The post was created successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
