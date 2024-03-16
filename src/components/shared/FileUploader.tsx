import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { IoIosImages } from 'react-icons/io';
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUPloaderProps = {
    fieldChange: (file: File[]) => void;
    mediaUrl: string;
}


const FileUploader: React.FC<FileUPloaderProps> = ({ fieldChange, mediaUrl }) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {

        setFile(acceptedFiles);
        fieldChange(acceptedFiles)
        setFileUrl(convertFileToUrl(acceptedFiles[0]))

    }, [file])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
        }
    })

    console.log("file", file)
    return (
        <div {...getRootProps()} className='flex flex-col  justify-center items-center bg-primary rounded-2xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="file" className="h-80 w-full rounded-2xl object-contain" />
                    </div>
                    <p className="text-light text-center text-sm font-normal w-full p-4 border-t-2 border-t-secondary">Click or drag photo to replace</p>
                </>

            ) : (
                <div className='flex justify-center items-center flex-col p-7 h-80'>
                    <IoIosImages size={96} color='gray' />
                    <h3 className="text-base font-medium text-light mb-2 mt-6 ">
                        {isDragActive ? "Drop photo here" : "Drag photo here"}
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