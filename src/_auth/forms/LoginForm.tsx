import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { LoginFormSchema } from '@/lib/validation'
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
import { signInAccount } from '@/lib/appwrite/api';
import { toast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        try {
            // Create a new user session
            const session = await signInAccount({ email: values.email, password: values.password })


            if (!session) {
                return toast({
                    title: "Login failed. Please try again.",

                })
            }

            const isLoggedIn = await checkAuthUser();
            if (isLoggedIn) {
                form.reset();
                navigate('/')
            } else {
                return toast({
                    title: "Login failed. Please try again.",

                })
            }

        } catch (error) {
            console.error(error)
        }
    }


    console.log("isUserLoading", isUserLoading)
    return (
        <Form {...form}>
            <div className='sm:w-420 flex flex-col justify-center items-center'>
                <h2 className='text-2xl font-semibold tracking-tight sm:pt-12 pt-5'>Log in to your account</h2>
                <p className="text-light md:text-base text-sm mt-2">
                    Welcome back! Please enter your details
                </p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">


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
                        {isUserLoading ?
                            <Loader />
                            : "Log in"}
                    </Button>

                    <p className="text-sm font-normal text-white/50 text-center mt-2">
                        Don't have an account?
                        <Link
                            to="/sign-up"
                            className="text-lime text-sm font-semibold ml-1">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default LoginForm


