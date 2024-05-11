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
import { useEffect, useState } from "react";
import { updateProject } from "@/lib/projects";
import { getUserFollows } from "@/lib/users";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    avatar: z.any().optional(),
    permissions: z.array(z.string()),
    allowedUsers: z.array(z.any()).optional(),
})

export function ProjectEditForm({ project, onSubmitSuccess }: { project: Project, onSubmitSuccess: () => void }) {
    const accessToken = Cookies.get('__catalyst__jwt');
    const [failState, setFailState] = useState<string>();
    const [successState, setSuccessState] = useState<string>();
    const [follows, setFollows] = useState<Option[]>([]);
    const trueKeys: string[] = Object.keys(project.permissions).filter(key => project.permissions[key as keyof Permissions] == true);
    const [usePrivate, setUsePrivate] = useState<boolean>(trueKeys.includes('private'));

    useEffect(() => {
        async function getFollows(accessToken: string){
            const userFollows = await getUserFollows(accessToken);
            const transformedFollows = userFollows.map(user => ({
                label: user.username,
                value: user.id
            }));
            setFollows(transformedFollows);
        }
        if(accessToken){
            getFollows(accessToken)
        }
    }, [accessToken])
    
    const permissions = [
        {id: 'private', label: 'Private'}, 
        {id: 'allowBranch', label: 'Allow Branches'}, 
        {id: 'allowCollaborate', label: 'Allow Collaborations'},
        {id: 'allowShare', label: 'Allow Sharing'}
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
            permissions: trueKeys
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = new FormData()
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('avatar', values.avatar);
        data.append('permissions', values.permissions.join());
        if (values.allowedUsers){
            for(const user of values.allowedUsers){
                data.append('allowedUsers', user.value);
            }
        }
        if(accessToken){
            const res = await updateProject(accessToken, data, project.id);
            if(!res.ok){
                const fail = await res.json();
                setFailState(fail)
            }else{
                setSuccessState('Project updated!')
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
                        <img className="rounded-sm" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${project.avatar}`} />
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
                <FormField
                control={form.control}
                name="permissions"
                render={() => (
                    <FormItem>
                        <FormLabel>Permissions</FormLabel>
                        {permissions.map((permission) => (
                            <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={permission.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(permission.id)}
                                        onCheckedChange={(checked: boolean) => {
                                        if(permission.id == 'private') { setUsePrivate(!usePrivate) }
                                        return checked
                                            ? field.onChange([...field.value, permission.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== permission.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {permission.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
                />
                {usePrivate && follows && 
                <FormField
                control={form.control}
                name="allowedUsers"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Allowed Users</FormLabel>
                        <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={follows}
                        placeholder="Select users you'd like to give access to..."
                        />
                        <FormMessage />
                    </FormItem>
                )}
                />}
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