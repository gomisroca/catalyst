// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProjectData, createProjectSchema } from '@/api/schemas/ProjectSchema';
// Hook Imports
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { useCreateProject } from '@/hooks/projects/useCreateProject';
// UI Imports
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

export default function CreateProject() {
  const { data: follows, isLoading: followsPending, error: followsError } = useGetFollowedUsers();
  const {
    mutate: createProject,
    isPending: createPending,
    isSuccess: createSuccess,
    error: createError,
  } = useCreateProject();

  const [options, setOptions] = useState<Option[]>([]);
  const [usePrivate, setUsePrivate] = useState<boolean>(false);

  useEffect(() => {
    if (follows) {
      setOptions(follows.map((user) => ({ value: user.id, label: user.username })));
    }
  }, [follows]);
  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];

  const form = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: ['allowBranch', 'allowCollaborate', 'allowShare'],
    },
  });

  async function onSubmit(values: CreateProjectData) {
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

  if (followsPending) return <Loading />;
  if (followsError) return <Error message={followsError.message} />;
  return (
    <>
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Avatar"
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
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
    </>
  );
}
