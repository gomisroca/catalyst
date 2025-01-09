// Base Imports
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Hook Imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBranch } from '@/lib/projects';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

interface BranchData {
  name: string;
  description: string;
  parentBranch: string;
  projectId: string;
  permissions: string[];
  allowedUsers: Option[] | undefined;
}

export function BranchUploadForm({ project, onSubmitSuccess }: { project: Project; onSubmitSuccess: () => void }) {
  const { data: user, isLoading: userLoading, error: userError } = useGetSelf();
  const { data: follows, isLoading: followsLoading, error: followsError } = useGetFollowedUsers();

  const [usePrivate, setUsePrivate] = useState<boolean>(false);

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

    const res = await createBranch(accessToken, data, project.id);
    if (!res.ok) {
      const fail = await res.json();
    } else {
      setTimeout(() => onSubmitSuccess(), 2000);
    }
  }

  if (userLoading || followsLoading) {
    return <Loading />;
  }
  if (userError || followsError) {
    return <Error message={userError?.message || followsError?.message} />;
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
                      (branch.author.id == user?.id || branch.permissions.allowedUsers.includes(user?.id)) && (
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
      </form>
    </Form>
  );
}
