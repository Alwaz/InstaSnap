import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { SignupFormSchema } from '@/lib/validation'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/shared';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queries-and-mutations';
import { useUserContext } from '@/context/AuthContext';


const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();



    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })


    async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
        try {
            const newUser = await createUserAccount(values)

            if (!newUser) {
                // show Toast with error message
                return toast({
                    title: "Sign up failed. Please try again.",

                })
            }

            // Create a new user session
            const session = await signInAccount({ email: values.email, password: values.password })


            if (!session) {
                return toast({
                    title: "Sign up failed. Please try again.",

                })
            }

            const isLoggedIn = await checkAuthUser();
            if (isLoggedIn) {
                form.reset();
                navigate('/')
            } else {
                return toast({
                    title: "Sign up failed. Please try again.",

                })
            }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Form {...form}>
            <div className='sm:w-420 flex flex-col justify-center items-center'>
                <h2 className='text-2xl font-semibold tracking-tight sm:pt-12 pt-5'>Create a new account</h2>
                <p className="text-light md:text-base text-sm mt-2">
                    To use InstaSnap, Please enter your details
                </p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Enter your good name" className='h-12 border-secondary placeholder:text-light bg-primary focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-lime  !important' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Name</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Enter your user name" className='h-12 border-secondary placeholder:text-light bg-primary focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-lime  !important' {...field} />
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
                                    <Input type='email' placeholder="Enter your email" className='h-12 border-secondary placeholder:text-light bg-primary focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-lime  !important' {...field} />
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
                                    <Input type='password' placeholder="Enter your password" className='h-12 border-secondary placeholder:text-light bg-primary focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-lime  !important' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='bg-lime text-primary hover:bg-lime/90' type="submit">
                        {isCreatingAccount ?
                            <Loader />
                            : "Sign In"}
                    </Button>

                    <p className="text-sm font-normal text-white/50 text-center mt-2">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-lime text-sm font-semibold ml-1">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignInForm
