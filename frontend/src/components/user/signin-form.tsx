import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GrGoogle } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { Separator } from "../ui/separator";
import Cookies from 'js-cookie';
 
const formSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).superRefine((password, checkPassComplexity) => {
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
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
            code: "custom",
            message: "Password requires lowercase, uppercase, symbol and number characters.",
            });
        }
    })
})
 
export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    })
    const userGoogleLogin = async () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_ORIGIN}/users/google`;
    };
    const userFbLogin = async () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_ORIGIN}/users/facebook`;
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = {
            email: values.email,
            password: values.password,
        }
        const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/sign-in`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        })
        if(res.ok){
            const data = await res.json();
            Cookies.set('__catalyst__jwt', data.access_token);
            window.location.href = '/';
        }
    }
    return (
    <> 
        <div className="flex flex-col gap-2 my-4">
            <Button variant="outline" className="flex gap-2 items-center" onClick={userGoogleLogin}>
                <GrGoogle />
                <span>Sign in using Google</span>
            </Button>
            <Button variant="outline" className="flex gap-2 items-center" onClick={userFbLogin}>
                <FaFacebook />
                <span>Sign in using Facebook</span>
            </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-center">
            <span>Or sign in with email</span>
        </div>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
       
    </>
    )
}