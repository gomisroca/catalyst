// Base Imports
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Hook Imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { updateBranch } from '@/lib/projects';
// UI Imports
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '../ui/loading';
import Error from '../ui/error';

interface BranchData {
  name: string;
  description: string;
  projectId: string;
  permissions: string[];
  allowedUsers: Option[] | undefined;
}

export function BranchEditForm({ branch, onSubmitSuccess }: { branch: Branch; onSubmitSuccess: () => void }) {
  const { data: follows, isLoading: followsLoading, error: followsError } = useGetFollowedUsers();

  const trueKeys: string[] = Object.keys(branch.permissions).filter(
    (key) => branch.permissions[key as keyof Permission] == true
  );
  const [usePrivate, setUsePrivate] = useState<boolean>(trueKeys.includes('private'));

  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];

  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    permissions: z.array(z.string()),
    allowedUsers: z.array(z.any()).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: branch.name,
      description: branch.description,
      permissions: trueKeys,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: BranchData = {
      projectId: branch.projectId,
      name: values.name,
      description: values.description,
      permissions: values.permissions,
      allowedUsers: undefined,
    };
    if (values.allowedUsers) {
      data.allowedUsers = values.allowedUsers;
    }

    const res = await updateBranch(accessToken, data, branch.id);
  }

  if (followsLoading) {
    return <Loading />;
  }
  if (followsError) {
    return <Error message={followsError?.message} />;
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
