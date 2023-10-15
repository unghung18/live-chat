'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../../assets/logo.png';
import { useRouter } from 'next/navigation';

const Welcome = () => {
    const [user, setUser] = useState();

    const router = useRouter();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        if (!userData) {
            router.push('/login')
        }
        setUser(userData);
    }, []);

    return (
        <div className='flex-[0.7] flex flex-col justify-center items-center gap-[20px] text-[#0000008a] border-b-[5px] border-solid border-[#63d7b0] rounded-[20px]'>
            <Image src={Logo} alt="logo" />
            <b>Hi, {user?.name}</b>
            <p>View and text directly to people present in the chat Rooms.</p>
        </div>
    )
}

export default Welcome;