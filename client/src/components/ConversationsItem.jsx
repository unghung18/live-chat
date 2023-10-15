import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const ConversationsItem = ({ conversation, lightThemeKey }) => {

    const router = useRouter();
    var name = useRef();

    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (conversation.isGroupChat) {
        name = conversation.chatName;
    }
    else {
        conversation.users.map((e) => {
            if (e._id != userData._id) {
                name = e.name
            }
        })
    }

    if (conversation.latestMessage == undefined) {
        return (
            <div className='flex justify-between items-center rounded-[20px] py-[5px] px-[5px] m-[10px] hover:bg-[#d9d9d9] cursor-pointer' onClick={() => router.push(`chatarea?chatId=${conversation._id}&name=${name}`)}>
                <div className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white mr-3'>{name[0]}</div>
                <div className='flex-1'>
                    <p className={`${lightThemeKey ? "text-[#0000008a]" : "text-white"}`}>{name}</p>
                    <p className='text-[12px]'>No previous Message, click here to start a new chat</p>
                </div>
                <div className='self-end text-[#0000008a] text-[12px]'>{conversation.timeStamp}</div>
            </div>
        )
    }
    else {

        return (
            <div className='flex justify-between items-center rounded-[20px] py-[5px] px-[5px] m-[10px] hover:bg-[#d9d9d9] cursor-pointer' onClick={() => router.push(`chatarea?chatId=${conversation._id}&name=${name}`)}>
                <div className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white mr-3'>{name[0]}</div>
                <div className='flex-1'>
                    <p className={`${lightThemeKey ? "text-[#0000008a]" : "text-white"}`}>{name}</p>
                    <p className='text-[12px]'>{conversation.isGroupChat ? `${conversation.latestMessage.sender._id === userData._id ? "You" : conversation.latestMessage.sender.name.split(" ").pop()} : ${conversation.latestMessage.content}` : `${conversation.latestMessage.sender._id === userData._id ? `You :  ${conversation.latestMessage.content}` : conversation.latestMessage.content}`}</p>
                </div>
                <div className='self-end text-[#0000008a] text-[12px]'>{conversation.timeStamp}</div>
            </div>
        )
    }

}

export default ConversationsItem;