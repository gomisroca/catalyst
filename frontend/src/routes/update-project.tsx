// Base Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProjectData, updateProjectSchema } from '@/api/schemas/ProjectSchema';
// Hook Imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { useGetProject } from '@/hooks/projects/useGetProject';
import { useUpdateProject } from '@/hooks/projects/useUpdateProject';
import { useGetSelf } from '@/hooks/users/useGetSelf';
// UI Imports
import MultipleSelector from '@/components/ui/multiple-selector';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/loading';
import Error from '@/components/ui/error';

export default function UpdateProject() {
  const { data: user, isLoading: userPending, error: userError } = useGetSelf();
  // Get ID from URL Params
  const { projectId } = useParams();
  if (!projectId) return <Error message="No project ID provided." />;

  // Fetch current project data and logged-in user follows
  const { data: project, isLoading, error } = useGetProject(projectId);
  const { data: follows, isLoading: followsPending, error: followsError } = useGetFollowedUsers();
  if (followsPending || isLoading) return <Loading />;
  if (followsError || error) return <Error message={followsError?.message || error?.message} />;
  if (!project) return <Error message="No project found." />;

  // Update project mutation
  const {
    mutate: updateProject,
    isPending: updatePending,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdateProject();

  // Map current permissions to be used in form
  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];
  const permissionKeys: string[] = Object.keys(project.permissions).filter(
    (key) => project.permissions[key as keyof Permission] == true
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

  // Init form with current project values
  const form = useForm<UpdateProjectData>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      permissions: permissionKeys,
    },
  });
  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        description: project.description,
        permissions: permissionKeys,
      });
    }
  }, [project, form]);

  // On submit, assert the project was fetched, and pass the updated data as FormData
  async function onSubmit(values: UpdateProjectData) {
    if (!project || !user) return;
    console.log(values);

    const data = new FormData();
    data.append('name', values.name);
    data.append('description', values.description);
    data.append('avatar', values.avatar);
    data.append('permissions', values.permissions.join());
    if (values.allowedUsers) {
      for (const user of values.allowedUsers) {
        data.append('allowedUsers', user.value);
      }
    }

    updateProject({ id: project.id, projectData: data });
  }

  if (userPending) return <Loading />;
  if (userError) return <Error message={userError.message} />;
  if (!user) return <Error message="You must be logged in to update a project." />;
  if (user.id !== project.author.id) return <Error message="You are not authorized to update this project." />;
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
              {project.avatar ? (
                <img
                  className="rounded-sm"
                  src={`${import.meta.env.VITE_IMG_ROOT + project.avatar}`}
                  alt="Project Avatar"
                />
              ) : (
                <p>No avatar uploaded</p>
              )}
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
            The project was updated successfully!
          </p>
        )}
      </form>
    </Form>
  );
}
