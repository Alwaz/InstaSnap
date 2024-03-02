import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoIosImages } from 'react-icons/io';
import { Button } from '../ui/button';

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState("");
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFile(acceptedFiles);

    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
        }
    })
    return (
        <div {...getRootProps()} className='flex flex-col  justify-center items-center bg-primary rounded-2xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="file" className="h-80 w-full rounded-2xl object-cover object-top" />
                    </div>
                    <p className="file_uploader-label">Click or drag photo to replace</p>
                </>

            ) : (
                <div className='flex justify-center items-center flex-col p-7 h-80'>
                    <IoIosImages size={96} color='gray' />
                    <h3 className="text-base font-medium text-light mb-2 mt-6 ">
                        Drag photo here
                    </h3>
                    <p className="text-light text-sm font-normal mb-6">SVG, PNG, JPG</p>

                    <Button type="button" className=" flex gap-2 px-5 rounded-xl py-2 text-white/65 bg-secondary">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}

export default FileUploader