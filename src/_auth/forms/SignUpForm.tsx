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
import { Link } from 'react-router-dom';

const SignInForm: React.FC = () => {
    const isLoading = false;

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SignupFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        {isLoading ?
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
