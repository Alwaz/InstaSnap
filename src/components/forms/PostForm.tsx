import { postFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea'



const CreatePostForm: React.FC = () => {
    const form = useForm<z.infer<typeof postFormSchema>>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            caption: "",
        },
    })


    function onSubmit(values: z.infer<typeof postFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full max-w-5xl gap-9 bg-secondary rounded-3xl py-4 px-4 md:px-5 ">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Caption</FormLabel>
                            <FormControl>
                                <Textarea className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl' placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="files"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Upload Files</FormLabel>
                            <FormControl>
                                <Textarea className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl' placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="files"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Upload Files</FormLabel>
                            <FormControl>
                                <Textarea className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl' placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='rounded-xl bg-lime text-primary hover:bg-lime/85  transition duration-200'>Submit</Button>
            </form>
        </Form>
    )
}

export default CreatePostForm