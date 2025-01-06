import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createPost } from '@/lib/projects';
import { Textarea } from '@/components/ui/textarea';

export function PostUploadForm({ branch, onSubmitSuccess }: { branch: Branch; onSubmitSuccess: () => void }) {
  const formSchema = z.object({
    content: z.string(),
    media: z.array(z.any()).max(5).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = new FormData();
    data.append('content', values.content);
    if (values.media) {
      Array.from(values.media).map((file) => data.append('media', file));
    }

    const res = await createPost(accessToken, data, branch);
    if (!res.ok) {
      const fail = await res.json();
    } else {
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
      </form>
    </Form>
  );
}
