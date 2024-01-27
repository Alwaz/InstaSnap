import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


const AuthLayout: React.FC = () => {
    const isAuthenticated: boolean = false;


    return (
        <>
            {
                isAuthenticated ?
                    <Navigate to="/" />
                    :
                    <section className='flex flex-1 flex-col justify-center items-center py-10 '>
                        <Outlet />
                    </section>
            }
        </>

    )
}

export default AuthLayout
