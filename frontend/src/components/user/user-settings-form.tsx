// Base Imports
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserData, updateUserSchema } from '@/api/schemas/UserSchema';
// Component Imports
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Hook Imports
import { useGetSelf } from '@/hooks/users/useGetSelf';
import { useUpdateUser } from '@/hooks/users/useUpdateUser';

export function UserSettingsForm() {
  const { data: user, isLoading: userPending, error: userError } = useGetSelf();
  const { mutate: updateUser, isPending: updatePending, error: updateError } = useUpdateUser();

  const form = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username,
      nickname: user?.nickname ? user?.nickname : '',
      email: user?.email,
      avatar: user?.avatar,
    },
  });

  async function onSubmit(values: UpdateUserData) {
    const data = new FormData();
    if (values.username) data.append('username', values.username);
    if (values.nickname) data.append('nickname', values.nickname);
    if (values.email) data.append('email', values.email);
    if (values.avatar) data.append('avatar', values.avatar);

    updateUser(data);
  }
  if (userPending) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }
  if (userError) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="mb-4 text-red-500">{userError?.message || updateError?.message}</p>
      </div>
    );
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                    accept="image/*, application/pdf"
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={updatePending}>
            {updatePending ? 'Updating...' : 'Update'}
          </Button>
          {updateError && (
            <p className="mt-2 text-red-500" role="alert">
              {updateError.message}
            </p>
          )}
        </form>
      </Form>
    </>
  );
}
