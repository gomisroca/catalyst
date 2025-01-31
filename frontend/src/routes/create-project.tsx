// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProjectData, createProjectSchema } from '@/api/schemas/ProjectSchema';
// Hook Imports
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { useCreateProject } from '@/hooks/projects/useCreateProject';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

export default function CreateProject() {
  const { data: user, isLoading: userPending, error: userError } = useGetSelf();
  // Fetch logged-in user follows
  const { data: follows, isLoading: followsPending, error: followsError } = useGetFollowedUsers();

  // Create project mutation
  const {
    mutate: createProject,
    isPending: createPending,
    isSuccess: createSuccess,
    error: createError,
  } = useCreateProject();

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
  const form = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: ['allowBranch', 'allowCollaborate', 'allowShare'],
    },
  });

  // On submit, pass the data as FormData
  async function onSubmit(values: CreateProjectData) {
    if (!user) return;
    console.log(values);

    const data = new FormData();
    data.append('name', values.name);
    data.append('description', values.description);
    if (values.avatar) data.append('avatar', values.avatar);
    data.append('permissions', values.permissions.join());
    if (values.allowedUsers) {
      for (const user of values.allowedUsers) {
        data.append('allowedUsers', user.value);
      }
    }
    createProject(data);
  }

  if (userPending || followsPending) return <Loading />;
  if (userError || followsError) return <Error message={userError?.message || followsError?.message} />;
  if (!user) return <Error message="You must be logged in to create a project." />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Avatar"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) onChange(file);
                  }}
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
            The project was created successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
