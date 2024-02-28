import React, { useEffect } from 'react'
import Logo from './Logo'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'
import { useLogoutAccount } from '@/lib/react-query/queries-and-mutations'
import { FiLogOut } from 'react-icons/fi'
import { sidebarLinks } from '@/constants'


const LeftSideBar: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { mutate: logout, isSuccess } = useLogoutAccount();

    useEffect(() => {
        if (isSuccess) navigate(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <nav className='bg-secondary hidden md:flex px-6 py-8 flex-col justify-between min-w-64 rounded-r-lg'>
            <div className='flex flex-col gap-10'>
                <Link to="/" className="flex items-center ">
                    <Logo />
                </Link>

                <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
                    <img src={user.imgUrl || "/assets/avatar.png"} alt="profile"
                        className="h-12 w-12 rounded-full" />

                    <div className="flex flex-col">
                        <p className="font-bold text-base text-white">{user.name || "John"}</p>
                        <p className="text-sm font-normal text-light">@{user.username || "johndoe"}</p>
                    </div>
                </Link>


                <ul className='flex gap-10 justify-center flex-col'>
                    {sidebarLinks.map(({ label, icon: Icon, path }) => {
                        const isActive = pathname === path;

                        return (
                            <li key={label}>
                                <NavLink to={path}
                                    className={`${isActive ? "bg-lime text-primary" : "text-white hover:bg-light hover:text-white"}  flex transition duration-300 items-center gap-4 px-4 py-2 rounded-xl`}>
                                    <div className={`text-xl font-normal ${isActive ? "text-primary" : "text-lime"}`}>
                                        <Icon />
                                    </div>
                                    <span className='text-base font-medium'>{label}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>

            </div>

            <div className='flex items-center'>
                <Button variant={"default"} className='flex w-full gap-4 items-center bg-light/50 duration-300 text-white rounded-xl' onClick={() => logout()}>
                    <FiLogOut title='logout' className='text-xl duration-200' />
                    <span className='text-base font-light'>Logout</span>
                </Button>
            </div>

        </nav>
    )
}

export default LeftSideBar
