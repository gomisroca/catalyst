import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cookies  from 'js-cookie';
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createPost } from "@/lib/projects";
import { useState } from "react";
import { Textarea } from "../ui/textarea";


export function PostUploadForm({ branch }: { branch: Branch }) {
    const accessToken = Cookies.get('__catalyst__jwt');
    const [failState, setFailState] = useState<string>();

    const formSchema = z.object({
        content: z.string(),
        media: z.array(z.any()).max(5),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const data = new FormData();
        data.append('content', values.content);
        Array.from(values.media).map((file) => data.append('media', file));
        console.log(data)
        if(accessToken){
            const res = await createPost(accessToken, data, branch)
            if(!res.ok){
                const fail = await res.json();
                setFailState(fail)
            }
        } else{
            setFailState('Must be logged in.')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
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
                render={({ field: { value, onChange, ...fieldProps } })=> (
                    <FormItem>
                        <FormLabel>Post Media</FormLabel>
                        <FormControl>
                        <Input
                        {...fieldProps}
                        placeholder="Media"
                        multiple
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(event) =>
                            onChange([...Array.from(event.target.files ?? [])])
                        }
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="mt-4">Submit</Button>
                {failState &&
                <div className="text-destructive m-auto">{failState}</div>}
            </form>
        </Form>
    )
}