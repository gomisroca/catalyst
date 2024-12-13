import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/user-provider';
import { useState } from 'react';
import { getCookie, setCookie } from '@/lib/cookies';

const formSchema = z.object({
  username: z.string(),
  nickname: z.string(),
  email: z.string().email({ message: 'Invalid Email' }),
  avatar: z.any(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .superRefine((password, checkPassComplexity) => {
      const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
      const containsLowercase = (ch: string) => /[a-z]/.test(ch);
      const containsSpecialChar = (ch: string) =>
        //eslint-disable-next-line
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
      let countOfUpperCase = 0;
      let countOfLowerCase = 0;
      let countOfNumbers = 0;
      let countOfSpecialChar = 0;
      for (let i = 0; i < password.length; i++) {
        const ch = password.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        else if (containsSpecialChar(ch)) countOfSpecialChar++;
      }
      if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
        checkPassComplexity.addIssue({
          code: 'custom',
          message: 'Password requires lowercase, uppercase, symbol and number characters.',
        });
      }
    }),
});

export function UserSettingsForm() {
  const { user } = useUser();
  const accessToken = getCookie('__catalyst__jwt');
  const [failState, setFailState] = useState<string>();
  const [successState, setSuccessState] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      nickname: user?.nickname ? user?.nickname : '',
      email: user?.email,
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = new FormData();
    data.append('username', values.username);
    data.append('nickname', values.nickname);
    data.append('email', values.email);
    data.append('avatar', values.avatar);
    data.append('password', values.password);

    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/settings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });
    if (!res.ok) {
      const fail = await res.json();
      setFailState(fail);
    } else {
      setSuccessState('Posted!');
      const data = await res.json();
      setCookie('__catalyst__jwt', data.access_token);
      window.location.href = '/';
    }
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="**********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {failState && <div className="m-auto text-destructive">{failState}</div>}
          {successState && <div className="m-auto">{successState}</div>}
        </form>
      </Form>
    </>
  );
}
