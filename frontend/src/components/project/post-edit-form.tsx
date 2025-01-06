// Base Imports
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Hook Imports
import { useForm } from 'react-hook-form';
import { updatePost } from '@/lib/projects';
import { useState } from 'react';
// UI Imports
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PostEditForm({ post, onSubmitSuccess }: { post: Post; onSubmitSuccess: () => void }) {
  const [failState, setFailState] = useState<string>();
  const [successState, setSuccessState] = useState<string>();

  const formSchema = z.object({
    content: z.string(),
    media: z.array(z.any()).max(5).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = new FormData();
    data.append('content', values.content);
    if (values.media) {
      Array.from(values.media).map((file) => data.append('media', file));
    }

    const res = await updatePost(accessToken, data, post.id);
    if (!res.ok) {
      const fail = await res.json();
      setFailState(fail);
    } else {
      setSuccessState('Post updated!');
      setTimeout(() => onSubmitSuccess(), 2000);
    }
  }

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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="media"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              {post.media &&
                post.media.map((media) => (
                  <img key={media} className="rounded-sm" src={`${import.meta.env.VITE_IMG_ROOT + media}`} />
                ))}
              <FormLabel>Post Media</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Media"
                  multiple
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) => onChange([...Array.from(event.target.files ?? [])])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
        {failState && <div className="m-auto text-destructive">{failState}</div>}
        {successState && <div className="m-auto">{successState}</div>}
      </form>
    </Form>
  );
}
