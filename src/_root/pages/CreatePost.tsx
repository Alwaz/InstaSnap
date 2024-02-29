import React from 'react'
import { PostForm } from '@/components/forms'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

const CreatePost: React.FC = () => {
    return (
        <div className='flex flex-1'>
            <div className='flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar'>
                <div className='flex justify-start items-center gap-3  max-w-5xl w-full'>
                    <MdOutlineAddPhotoAlternate size={36} />
                    <h2 className='font-bold leading-6 text-2xl tracking-wide '>Create Post</h2>
                </div>

                <PostForm />
            </div>

        </div>
    )
}

export default CreatePost