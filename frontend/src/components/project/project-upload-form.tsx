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
import { Switch } from "../ui/switch";
import { useState } from "react";

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    avatar: z.any(),
    branchName: z.string().optional(),
    branchDescription: z.string().optional(),
})

export function ProjectUploadForm() {
    const accessToken = Cookies.get('__catalyst__jwt');
    const [branchFields, setBranchFields] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = new FormData()
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('avatar', values.avatar);
        if(values.branchName && values.branchDescription){
            data.append('branchName', values.branchName);
            data.append('branchDescription', values.branchDescription);
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: data
        })
        if(res.ok){
            console.log('ok')
        }
    }
    return (
    <> 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="avatar"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } })=> (
                    <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                        <Input
                        {...fieldProps}
                        placeholder="Avatar"
                        type="file"
                        accept="image/*, application/pdf"
                        onChange={(event) =>
                            onChange(event.target.files && event.target.files[0])
                        }
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex items-center gap-2">
                <FormLabel>Create Main Branch?</FormLabel>
                <Switch 
                    checked={branchFields}
                    onCheckedChange={() => setBranchFields(!branchFields)}
                />
                </div>
                {branchFields &&
                <>
                <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Main Branch Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="branchDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Main Branch Description</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                </>}
                <Button type="submit" className="mt-4">Submit</Button>
            </form>
        </Form>
       
    </>
    )
}