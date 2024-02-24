import React, { useEffect } from 'react'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'
import { useLogoutAccount } from '@/lib/react-query/queries-and-mutations'
import { FiLogOut } from 'react-icons/fi'


const LeftSideBar: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { mutate: logout, isSuccess } = useLogoutAccount();

    useEffect(() => {
        if (isSuccess) navigate(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <section className='bg-secondary md:w-48 w-0'>
            <div className='flex justify-between items-center py-6 px-3'>
                <Link to="/" className="flex items-center justify-center">
                    <Logo />
                </Link>
            </div>
        </section>
    )
}

export default LeftSideBar
