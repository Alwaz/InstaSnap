import React from 'react'
import { ImSpinner9 } from 'react-icons/im'

const Loader: React.FC = () => {
    return (
        <div className='w-full flex justify-center items-center '>
            <ImSpinner9 className='animate-spin w-5 h-5 text-secondary' />
        </div>
    )
}

export default Loader
