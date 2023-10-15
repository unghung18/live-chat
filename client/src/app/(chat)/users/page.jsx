'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../../../assets/logo.png';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import apis from '@/api/api';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { refreshSidebarActions } from '@/redux/features/refreshSidebarSlice';

const Users = () => {
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);

    const router = useRouter();
    const dispatch = useDispatch();
    const lightThemeKey = useSelector(state => state.lightTheme.lightThemeKey);

    const handleInputSeach = (e) => {
        setKeyword(e.target.value);
    }
    const getAllUsers = async () => {
        const usersData = await apis.fetchAllUsers(keyword);
        setUsers(usersData);
    }
    const enterEvent = (e) => {
        if (e.keyCode === 13) {
            getAllUsers();
        }
    }
    const accessChat = async (user) => {
        try {
            const chatData = await apis.accessChat(user._id);
            router.push(`/chatarea?chatId=${chatData._id}&name=${user.name}`);
            dispatch(refreshSidebarActions.toggle())

        } catch (error) {
            alert(error.response.data.message)
        }
    }
    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <div className='flex flex-[0.7] flex-col'>
            <div className='bg-white rounded-[20px] py-2 px-1 m-3 flex justify-between items-center shadow-xl'>
                <Image src={Logo} alt='Logo' className='h-8 w-8 mx-3' />
                <p className='flex-1 text-[#0000008a] font-bold'>Available Users</p>
                <IconButton onClick={getAllUsers}>
                    <RefreshIcon />
                </IconButton>
            </div>
            <div className=' bg-white rounded-[20px] py-[5px] px-[5px] m-[10px] flex items-center shadow-xl'>
                <IconButton onClick={getAllUsers}>
                    <SearchIcon />
                </IconButton>
                <input type="text" placeholder='Search' className=' outline-none border-none text-[1.25rem] ml-[10px] text-[#0000008a] w-full' onChange={handleInputSeach} onKeyDown={enterEvent} />
            </div>
            <div className='flex-1 overflow-x-auto no-scrollbar p-3'>
                {users.map((user, i) => (
                    <div className={` ${lightThemeKey ? "bg-white text-[#0000008a]" : "bg-[#2d3941] text-[#ababab]"} flex items-center  shadow-md rounded-[20px] py-[10px] px-[5px] m-[10px] select-none`} key={i} onClick={() => accessChat(user)}>
                        <p className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white mr-3'>{user?.name[0]}</p>
                        <p className='font-medium'>{user.name}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Users