'use client'
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import ConversationsItem from '@/components/ConversationsItem';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { lightThemeActions } from '@/redux/features/lightThemeSlice';
import apis from '@/api/api';

const Sidebar = () => {

    const [conversations, setConversations] = useState([])

    const router = useRouter();

    const dispatch = useDispatch();
    const lightThemeKey = useSelector(state => state.lightTheme.lightThemeKey);
    const refreshSidebarKey = useSelector(state => state.refreshSidebar.refreshSidebarKey);

    const getAllChats = async () => {
        const chatsData = await apis.fetchChats();
        setConversations(chatsData)
    }

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        router.push('/')
    }

    useEffect(() => {
        getAllChats();
    }, [refreshSidebarKey]);

    return (
        <div className='flex-[0] flex flex-col sm:flex-[0.3]'>
            <div className={`py-[10px] px-[5px] m-[10px] flex rounded-[20px] bg-white justify-evenly items-center shadow-xl flex-col sm:flex-row flex-1 sm:flex-[0] ${lightThemeKey ? "" : "!bg-[#2d3941]"}`}>
                <IconButton onClick={() => router.push('welcome')} >
                    <AccountCircleIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
                <IconButton onClick={() => router.push('users')}>
                    <PersonAddIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
                <IconButton onClick={() => router.push('groups')}>
                    <GroupAddIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
                <IconButton onClick={() => router.push('create-group')}>
                    <AddCircleIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
                <IconButton onClick={() => dispatch(lightThemeActions.toggle())}>
                    {lightThemeKey ? <NightlightIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} /> : <LightModeIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />}
                </IconButton>
                <IconButton onClick={handleLogOut}>
                    <LogoutIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
            </div>
            <div className={`bg-white rounded-[20px] py-[5px] px-[5px] m-[10px] hidden items-center shadow-xl sm:flex ${lightThemeKey ? "" : "!bg-[#2d3941]"}`}>
                <IconButton>
                    <SearchIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#ababab]"}`} />
                </IconButton>
                <input type="text" placeholder='Search' className={`outline-none border-none text-[1.25rem] ml-[10px] text-[#0000008a] ${lightThemeKey ? "" : "!bg-[#2d3941] !text-[#f5f5f5]"}`} />
            </div>
            <div className={`bg-white rounded-[20px] py-[5px] px-[5px] m-[10px] flex-1 shadow-xl hidden sm:block ${lightThemeKey ? "" : "!bg-[#2d3941] !text-[#ababab]"}`}>
                {conversations?.map((conversation, i) => {
                    return <ConversationsItem conversation={conversation} key={i} lightThemeKey={lightThemeKey} />
                })}
            </div>
        </div>
    )
}

export default Sidebar