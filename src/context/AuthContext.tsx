import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const INITIAL_USER = {
    id: "",
    name: '',
    username: "",
    email: "",
    bio: "",
    imgUrl: ""
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


    const checkAuthUser = async () => {
        try {
            setIsLoading(true);
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount?.$id,
                    name: currentAccount?.name,
                    username: currentAccount?.username,
                    email: currentAccount?.email,
                    imgUrl: currentAccount?.imgUrl,
                    bio: currentAccount?.bio,
                });
                setIsAuthenticated(true)
                return true;
            }
            return false;

        } catch (error) {
            console.error(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // const cookieFallback = localStorage.getItem("cookieFallback");
        if (localStorage.getItem("cookieFallback") === '[]') {
            navigate('/login')
        }
        checkAuthUser();

    }, [])

    const value = useMemo(() => ({
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }), []);



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext)


