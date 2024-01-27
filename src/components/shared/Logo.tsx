import React from 'react'
import { IoCameraOutline } from 'react-icons/io5'

const Logo: React.FC = () => {
    return (
        <div className='sm:w-420 flex justify-center items-center gap-1'>
            <IoCameraOutline className="h-7 w-7 text-lime" />
            <h1 className="text-3xl font-bold text-white">InstaSnap</h1>
        </div>
    )
}

export default Logo
