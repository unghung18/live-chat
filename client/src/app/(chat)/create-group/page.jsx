'use client'
import React, { useState } from 'react';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { IconButton } from '@mui/material';
import apis from '@/api/api';
import { useDispatch } from 'react-redux';
import { refreshSidebarActions } from '@/redux/features/refreshSidebarSlice';
import { useRouter } from 'next/navigation';

const CreateGroups = () => {

    const [chatName, setChatName] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();


    const handleInputChatName = (e) => {
        setChatName(e.target.value)
    }

    const createGroup = async () => {
        try {
            const groupData = await apis.createGroups(chatName);
            alert("Nhom da duoc tao");
            dispatch(refreshSidebarActions.toggle())
            router.push(`/chatarea?chatId=${groupData._id}&name=${groupData.chatName}`);

        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            createGroup()
        }
    }
    return (
        <div className='flex-[0.7] flex justify-between self-center'>
            <div className='flex justify-between self-center py-[20px] px-[15px] m-[10px] bg-white w-full rounded-[20px]'>
                <input type="text" placeholder='Enter Group Name' className=' outline-none border-none text-[#0000008a] text-xl w-full mr-4' onChange={handleInputChatName} onKeyDown={handleEnter} />
                <IconButton onClick={createGroup}>
                    <DoneOutlineRoundedIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default CreateGroups