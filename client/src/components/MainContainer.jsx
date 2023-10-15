'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const MainContainer = ({ children }) => {

    const router = useRouter();
    const lightThemeKey = useSelector(state => state.lightTheme.lightThemeKey);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser'));

        if (!userData) {
            router.push('/')
        }
    }, []);
    return (
        <div className={`${lightThemeKey ? "bg-[#dddedd]" : "bg-[#1E1E1E]"} w-screen h-screen flex justify-center items-center`}>
            <div className={`${lightThemeKey ? "bg-[#f4f5f8]" : "bg-[#20272b]"} w-[100vw] h-[100vh] flex rounded-none shadow-md sm:w-[90vw] sm:h-[90vh] sm:rounded-[20px]`}>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default MainContainer