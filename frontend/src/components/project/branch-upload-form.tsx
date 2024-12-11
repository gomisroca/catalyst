import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createBranch } from '@/lib/projects';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { useUser } from '@/contexts/user-provider';
import { useEffect, useState } from 'react';
import { getUserFollows } from '@/lib/users';
import MultipleSelector, { Option } from '../ui/multiple-selector';

interface BranchData {
  name: string;
  description: string;
  parentBranch: string;
  projectId: string;
  permissions: string[];
  allowedUsers: Option[] | undefined;
}

export function BranchUploadForm({ project, onSubmitSuccess }: { project: Project; onSubmitSuccess: () => void }) {
  const { user } = useUser();
  const accessToken = Cookies.get('__catalyst__jwt');
  const [failState, setFailState] = useState<string>();
  const [successState, setSuccessState] = useState<string>();
  const [usePrivate, setUsePrivate] = useState<boolean>(false);
  const [follows, setFollows] = useState<Option[]>([]);

  useEffect(() => {
    async function getFollows(accessToken: string) {
      const userFollows = await getUserFollows(accessToken);
      const transformedFollows = userFollows.map((user) => ({
        label: user.username,
        value: user.id,
      }));
      console.log(transformedFollows);
      setFollows(transformedFollows);
    }
    if (accessToken) {
      getFollows(accessToken);
    }
  }, [accessToken]);

  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];

  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    parentBranch: z.string(),
    permissions: z.array(z.string()),
    allowedUsers: z.array(z.any()).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      parentBranch: 'none',
      permissions: ['allowBranch', 'allowCollaborate', 'allowShare'],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: BranchData = {
      projectId: project.id,
      parentBranch: values.parentBranch,
      name: values.name,
      description: values.description,
      permissions: values.permissions,
      allowedUsers: undefined,
    };
    if (values.allowedUsers) {
      data.allowedUsers = values.allowedUsers;
    }

    if (accessToken) {
      const res = await createBranch(accessToken, data, project.id);
      if (!res.ok) {
        const fail = await res.json();
        setFailState(fail);
      } else {
        setSuccessState('Branch created!');
        setTimeout(() => onSubmitSuccess(), 2000);
      }
    } else {
      setFailState('Must be logged in.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Name</FormLabel>
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
          name="parentBranch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Branch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'none'}>None</SelectItem>
                  {project.branches.map((branch) =>
                    branch.permissions.private ? (
                      user &&
                      (branch.author.id == user.id || branch.permissions.allowedUsers.includes(user.id)) && (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      )
                    ) : (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
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
                      <FormItem key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(permission.id)}
                            onCheckedChange={(checked: boolean) => {
                              if (permission.id == 'private') {
                                setUsePrivate(!usePrivate);
                              }
                              return checked
                                ? field.onChange([...field.value, permission.id])
                                : field.onChange(field.value?.filter((value) => value !== permission.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{permission.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        {usePrivate && follows && (
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
          />
        )}
        <Button type="submit" className="mt-4">
          Submit
        </Button>
        {failState && <div className="m-auto text-destructive">{failState}</div>}
        {successState && <div className="m-auto">{successState}</div>}
      </form>
    </Form>
  );
}
