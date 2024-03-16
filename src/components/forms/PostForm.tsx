import { PostFormSchema } from '@/lib/validation'
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
import { FileUploader } from '../shared'
import { Input } from '../ui/input'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '@/lib/react-query/queries-and-mutations'
import { Loader } from 'lucide-react'

type PostFormProps = {
    post?: Models.Document;
    type: "Create" | "Update"
}

const CreatePostForm: React.FC<PostFormProps> = ({ post, type }) => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof PostFormSchema>>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : ""
        },
    })


    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();


    async function onSubmit(values: z.infer<typeof PostFormSchema>) {
        const newPost = await createPost({ ...values, userId: user.id });
        console.log("new post set hy boss", newPost)

        if (!newPost) {
            toast({ title: `${type} post failed, Please give it another shot` })
        }
        navigate("/")
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
                                <Textarea
                                    {...field}
                                    className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl'
                                />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imgUrl}
                                />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Location</FormLabel>
                            <FormControl>
                                <Input className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl' {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Tags (separated by comma " , ")</FormLabel>
                            <FormControl>
                                <Input className='h-12 bg-primary  border-none placeholder:text-light focus-visible:ring-1  focus-visible:ring-offset-1 custom-scrollbar ring-offset-lime/75 rounded-xl' placeholder="Travel, Fitness, Food" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-600' />
                        </FormItem>
                    )}
                />





                <div className='flex justify-end items-center gap-4'>
                    <Button
                        className='rounded-xl bg-light'>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoadingCreate}
                        className='rounded-xl bg-lime text-primary hover:bg-lime/85  transition duration-200'>
                        {isLoadingCreate ? <Loader /> : `${type} Post`}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreatePostForm