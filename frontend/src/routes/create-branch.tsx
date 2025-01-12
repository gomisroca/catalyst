// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBranchFormData, createBranchFormSchema } from '@/api/schemas/BranchSchema';
// Hook Imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateBranch } from '@/hooks/branches/useCreateBranch';
import { useParams } from 'react-router-dom';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
// UI Imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

export default function CreateBranch() {
  const { projectId } = useParams();
  if (!projectId) return <Error message="No project ID provided." />;

  // Fetch logged-in user follows
  const { data: follows, isLoading: followsLoading, error: followsError } = useGetFollowedUsers();

  // Create branch mutation
  const {
    mutate: createBranch,
    isPending: createPending,
    isSuccess: createSuccess,
    error: createError,
  } = useCreateBranch();

  // Map permissions to be used in form
  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];
  const [usePrivate, setUsePrivate] = useState<boolean>(false);
  const handleCheckboxChange = (checked: boolean, id: string) => {
    if (id === 'private') setUsePrivate(!usePrivate);
    form.setValue(
      'permissions',
      checked ? [...form.getValues('permissions'), id] : form.getValues('permissions').filter((value) => value !== id)
    );
  };

  // Map user followers to be used in form
  const options = follows?.map((user) => ({ value: user.id, label: user.username })) || [];

  // Init form with default values
  const form = useForm<CreateBranchFormData>({
    resolver: zodResolver(createBranchFormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: ['allowBranch', 'allowCollaborate', 'allowShare'],
    },
  });

  // On submit, pass the data
  async function onSubmit(values: CreateBranchFormData) {
    console.log(values);

    const data = {
      projectId: projectId!,
      name: values.name,
      description: values.description,
      permissions: values.permissions,
      allowedUsers: values.allowedUsers ? values.allowedUsers.map((user) => user.value) : undefined,
    };

    createBranch(data);
  }

  if (followsLoading) return <Loading />;
  if (followsError) return <Error message={followsError?.message} />;
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
                            onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, permission.id)}
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
                  defaultOptions={options}
                  placeholder="Select users you'd like to give access to..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="mt-4" disabled={createPending}>
          {createPending ? 'Creating...' : 'Submit'}
        </Button>
        {createError && (
          <p className="mt-2 text-red-500" role="alert">
            {createError.message}
          </p>
        )}
        {createSuccess && (
          <p className="mt-2 text-green-500" role="alert">
            The branch was created successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
