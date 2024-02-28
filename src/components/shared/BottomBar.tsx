import { bottomBarLinks } from '@/constants';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const BottomBar: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <section className='z-50 md:hidden flex justify-between items-center sticky bottom-0 rounded-t-3xl  bg-secondary px-5 py-4'>

            {bottomBarLinks.map(({ label, icon: Icon, path }) => {
                const isActive = pathname === path;

                return (

                    <Link to={path}
                        key={label}
                        className={`${isActive ? "bg-lime text-primary" : "text-white hover:bg-light hover:text-white"}  flex transition duration-300 flex-col items-center gap-2 px-3 py-2 flex-wrap rounded-2xl`}>
                        <div className={`text-sm font-normal ${isActive ? "text-primary" : "text-lime"}`}>
                            <Icon />
                        </div>
                        <span className='text-xs font-medium break-words'>{label}</span>
                    </Link>

                )
            })}
        </section>
    )
}

export default BottomBar