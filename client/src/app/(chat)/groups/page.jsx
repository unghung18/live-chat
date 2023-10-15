'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../../../assets/logo.png';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import apis from '@/api/api';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { refreshSidebarActions } from '@/redux/features/refreshSidebarSlice';

const Groups = () => {
    const [keyword, setKeyword] = useState("");
    const [groups, setGroups] = useState([]);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleInputSearch = (e) => {
        setKeyword(e.target.value)
    }

    const getGroups = async () => {
        const groupsData = await apis.fetchAllGroups(keyword);
        setGroups(groupsData);
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            getGroups();
        }
    }

    const accessGroup = async (chatId) => {
        try {
            const groupData = await apis.addSelfToGroup(chatId);
            router.push(`/chatarea?chatId=${groupData._id}&name=${groupData.chatName}`);
            dispatch(refreshSidebarActions.toggle())
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getGroups();
    }, []);
    return (
        <div className='flex flex-[0.7] flex-col'>
            <div className='bg-white rounded-[20px] py-2 px-1 m-3 flex justify-between items-center shadow-xl'>
                <Image src={Logo} alt='Logo' className='h-8 w-8 mx-3' />
                <p className='flex-1 text-[#0000008a] font-bold'>Available Groups</p>
                <IconButton onClick={getGroups}>
                    <RefreshIcon />
                </IconButton>
            </div>
            <div className=' bg-white rounded-[20px] py-[5px] px-[5px] m-[10px] flex items-center shadow-xl'>
                <IconButton onClick={getGroups}>
                    <SearchIcon />
                </IconButton>
                <input type="text" placeholder='Search' className=' outline-none border-none text-[1.25rem] ml-[10px] text-[#0000008a] w-full' onChange={handleInputSearch} onKeyDown={handleEnter} />
            </div>
            <div className='flex-1 overflow-x-auto no-scrollbar p-3'>
                {groups.map((group, i) => (
                    <div className='flex items-center bg-white shadow-md rounded-[20px] py-[10px] px-[5px] m-[10px] select-none' key={i} onClick={() => accessGroup(group._id)}>
                        <p className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white mr-3'>{group.chatName[0].toUpperCase()}</p>
                        <p className='text-[#0000008a] font-medium'>{group.chatName}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Groups