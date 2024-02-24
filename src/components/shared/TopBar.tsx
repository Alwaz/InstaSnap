import React, { useEffect } from 'react'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'
import { useLogoutAccount } from '@/lib/react-query/queries-and-mutations'
import { FiLogOut } from 'react-icons/fi'


const TopBar: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { mutate: logout, isSuccess } = useLogoutAccount();

    useEffect(() => {
        if (isSuccess) navigate(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <section className=' sticky top-0 md:hidden w-full'>
            <div className='flex justify-between items-center py-3 px-4'>
                <Link to="/" className="flex items-center justify-center">
                    <Logo />
                </Link>


                <div className='flex items-center gap-1'>
                    <Button variant={"ghost"} className='flex gap-4 items-center' onClick={() => logout()}>
                        <FiLogOut title='logout' className='text-xl text-white/80  hover:text-lime duration-200' />
                    </Button>

                    <Link to={`/profile/${user.id}`} className='flex justify-center items-center'>
                        <img src={user.imgUrl ?? ""} alt="profile"
                            className="h-8 w-8 rounded-full" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopBar
