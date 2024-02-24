import { BottomBar, LeftSideBar, TopBar } from '@/components/shared'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: React.FC = () => {
    return (
        <div className='w-full md:flex'>
            <TopBar />
            <LeftSideBar />

            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>

            <BottomBar />
        </div>
    )
}

export default RootLayout
