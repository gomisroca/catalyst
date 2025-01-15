// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePostData, updatePostSchema } from '@/api/schemas/PostSchema';
// Hook Imports
import { useEffect } from 'react';
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetPost } from '@/hooks/posts/useGetPost';
import { useUpdatePost } from '@/hooks/posts/useUpdatePost';
// UI Imports
import { Button } from '@/components/ui/button';
import Error from '@/components/ui/error';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/loading';

export default function UpdatePost() {
  const { data: user, isLoading: userPending, error: userError } = useGetSelf();

  // Get ID from URL Params
  const { postId } = useParams();
  if (!postId) return <Error message="No post ID provided." />;

  // Fetch current post data
  const { data: post, isLoading, error } = useGetPost(postId);
  if (isLoading) return <Loading />;
  if (error) return <Error message={error?.message} />;
  if (!post) return <Error message="No post found." />;

  // Update post mutation
  const {
    mutate: updatePost,
    isPending: updatePending,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdatePost();

  // Init form with default values
  const form = useForm<UpdatePostData>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      content: '',
    },
  });
  useEffect(() => {
    if (post) {
      form.reset({
        content: post.content,
      });
    }
  }, [post, form]);

  // On submit, assert the post was fetched, and pass the updated data as FormData
  async function onSubmit(values: UpdatePostData) {
    if (!post || !user) return;
    console.log(values);

    const data = new FormData();
    data.append('content', values.content);
    if (values.media) data.append('media', values.media);

    updatePost({ id: post.id, postData: data });
  }

  if (userPending) return <Loading />;
  if (userError) return <Error message={userError.message} />;
  if (!user) return <Error message="You must be logged in to update a post." />;
  if (user.id !== post.author.id) return <Error message="You are not authorized to update this post." />;
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
        <Button type="submit" className="mt-4" disabled={updatePending}>
          {updatePending ? 'Updating...' : 'Update'}
        </Button>
        {updateError && (
          <p className="mt-2 text-red-500" role="alert">
            {updateError.message}
          </p>
        )}
        {updateSuccess && (
          <p className="mt-2 text-green-500" role="alert">
            The post was updated successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
