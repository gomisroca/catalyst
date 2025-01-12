// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateBranchFormData, updateBranchFormSchema } from '@/api/schemas/BranchSchema';
// Hook Imports
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { useParams } from 'react-router-dom';
import { useGetBranch } from '@/hooks/branches/useGetBranch';
import { useUpdateBranch } from '@/hooks/branches/useUpdateBranch';
// UI Imports
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

export default function UpdateBranch() {
  // Get ID from URL Params
  const { branchId } = useParams();
  if (!branchId) return <Error message="No branch ID provided." />;

  // Fetch current branch data and logged-in user follows
  const { data: branch, isLoading, error } = useGetBranch(branchId);
  const { data: follows, isLoading: followsPending, error: followsError } = useGetFollowedUsers();
  if (followsPending || isLoading) return <Loading />;
  if (followsError || error) return <Error message={followsError?.message || error?.message} />;
  if (!branch) return <Error message="No branch found." />;

  // Update branch mutation
  const {
    mutate: updateBranch,
    isPending: updatePending,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdateBranch();

  // Map current permissions to be used in form
  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];
  const permissionKeys: string[] = Object.keys(branch.permissions).filter(
    (key) => branch.permissions[key as keyof Permission] == true
  );
  const [usePrivate, setUsePrivate] = useState<boolean>(permissionKeys.includes('private'));
  const handleCheckboxChange = (checked: boolean, id: string) => {
    if (id === 'private') setUsePrivate(!usePrivate);
    form.setValue(
      'permissions',
      checked ? [...form.getValues('permissions'), id] : form.getValues('permissions').filter((value) => value !== id)
    );
  };

  // Map user followers to be used in form
  const options = follows?.map((user) => ({ value: user.id, label: user.username })) || [];

  const form = useForm<UpdateBranchFormData>({
    resolver: zodResolver(updateBranchFormSchema),
    defaultValues: {
      name: branch.name,
      description: branch.description,
      permissions: permissionKeys,
    },
  });
  useEffect(() => {
    if (branch) {
      form.reset({
        name: branch.name,
        description: branch.description,
        permissions: permissionKeys,
      });
    }
  }, [branch, form]);

  // On submit, assert branch project was fetched, and pass the updated data
  async function onSubmit(values: UpdateBranchFormData) {
    if (!branch) return;
    console.log(values);

    const data = {
      projectId: branch.projectId,
      name: values.name,
      description: values.description,
      permissions: values.permissions,
      allowedUsers: values.allowedUsers ? values.allowedUsers.map((user) => user.value) : undefined,
    };

    updateBranch({ id: branch.id, branchData: data });
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
        <Button type="submit" className="mt-4" disabled={updatePending}>
          {updatePending ? 'Updating...' : 'Submit'}
        </Button>
        {updateError && (
          <p className="mt-2 text-red-500" role="alert">
            {updateError.message}
          </p>
        )}
        {updateSuccess && (
          <p className="mt-2 text-green-500" role="alert">
            The branch was updated successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
