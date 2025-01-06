// Base Imports
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Hook Imports
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetFollowedUsers } from '@/hooks/users/useGetFollowedUsers';
import { createProject } from '@/lib/projects';
// UI Imports
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  avatar: z.any(),
  permissions: z.array(z.string()),
  allowedUsers: z.array(z.any()).optional(),
  branchName: z.string().optional(),
  branchDescription: z.string().optional(),
});

export function ProjectUploadForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const { data: follows } = useGetFollowedUsers();
  const [branchFields, setBranchFields] = useState<boolean>(false);
  const [usePrivate, setUsePrivate] = useState<boolean>(false);

  const permissions = [
    { id: 'private', label: 'Private' },
    { id: 'allowBranch', label: 'Allow Branches' },
    { id: 'allowCollaborate', label: 'Allow Collaborations' },
    { id: 'allowShare', label: 'Allow Sharing' },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: ['allowBranch', 'allowCollaborate', 'allowShare'],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    if (values.branchName && values.branchDescription) {
      data.append('branchName', values.branchName);
      data.append('branchDescription', values.branchDescription);
    }

    const res = await createProject(accessToken, data);
    if (!res.ok) {
      const fail = await res.json();
    } else {
      setTimeout(() => onSubmitSuccess(), 2000);
    }
  }
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
                    defaultOptions={follows}
                    placeholder="Select users you'd like to give access to..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex items-center gap-2">
            <FormLabel>Create Main Branch?</FormLabel>
            <Switch checked={branchFields} onCheckedChange={() => setBranchFields(!branchFields)} />
          </div>
          {branchFields && (
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
            </>
          )}
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
