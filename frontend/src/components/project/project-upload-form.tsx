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
import { createProject } from "@/lib/projects";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    avatar: z.any(),
    branchName: z.string().optional(),
    branchDescription: z.string().optional(),
})

export function ProjectUploadForm({onSubmitSuccess}: { onSubmitSuccess: () => void }) {
    const accessToken = Cookies.get('__catalyst__jwt');
    const [branchFields, setBranchFields] = useState<boolean>(false);
    const [failState, setFailState] = useState<string>();
    const [successState, setSuccessState] = useState<string>();

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
        if(accessToken){
            const res = await createProject(accessToken, data);
            if(!res.ok){
                const fail = await res.json();
                setFailState(fail)
            }else{
                setSuccessState('Project created!')
                setTimeout(() => onSubmitSuccess(), 2000)
            }
        } else{
            setFailState('Must be logged in.')
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
                {failState &&
                <div className="text-destructive m-auto">{failState}</div>}
                {successState &&
                <div className="m-auto">{successState}</div>}
            </form>
        </Form>
       
    </>
    )
}