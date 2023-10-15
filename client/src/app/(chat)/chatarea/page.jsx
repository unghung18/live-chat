'use client'
import React, { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import io from 'socket.io-client'

import { refreshSidebarActions } from '@/redux/features/refreshSidebarSlice';
import MessageOthers from '@/components/MessageOthers';
import MessageSelf from '@/components/MessageSelf';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import apis from '@/api/api';

const ChatArea = () => {
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");


    const lightThemeKey = useSelector(state => state.lightTheme.lightThemeKey)
    const searchParams = useSearchParams();
    const router = useRouter()
    const socket = useRef();
    const scrollRef = useRef();
    const dispatch = useDispatch();

    const chatId = searchParams.get("chatId");
    const name = searchParams.get("name");

    const getAllMessages = async () => {
        const messagesData = await apis.getAllMessages(chatId);
        setMessages(messagesData)
    }
    const handleInputMessage = (e) => {
        setMsg(e.target.value)
    }

    const joinAllChats = async () => {
        const chatsData = await apis.fetchChats();
        console.log(chatsData)
        chatsData.map((e) => {
            socket.current.emit('join-chat', e._id);
        })
    }

    const handleSendMessage = async () => {
        try {
            const messageData = await apis.sendMessage({
                content: msg,
                chatId: chatId
            })
            setMsg("");

            socket.current.emit('send-msg', messageData);

            dispatch(refreshSidebarActions.toggle())
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const handleEnterEvent = async (e) => {
        if (e.keyCode === 13) {
            try {
                const messageData = await apis.sendMessage({
                    content: msg,
                    chatId: chatId
                })
                setMsg("");

                socket.current.emit('send-msg', messageData);

                dispatch(refreshSidebarActions.toggle())

            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        joinAllChats();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        if (!userData) {
            router.push('/login')
        }
        setUser(userData);
        socket.current = io.connect('http://localhost:8080');
        socket.current.on('server-send-message', (message) => {
            setMessages(prev => [...prev, message]);
            dispatch(refreshSidebarActions.toggle())
        })
    }, []);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        if (userData || chatId) {
            getAllMessages();
        }
    }, [chatId]);

    return (
        <div className={`flex-1 flex flex-col sm:flex-[0.7]`}>
            <div className={`flex items-center gap-[10px] bg-white p-[15px] m-[10px] rounded-[20px] shadow-xl ${lightThemeKey ? "" : "!bg-[#2d3941] !text-[#f5f5f5]"}`}>
                <p className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white mr-3'>{name.split(" ").pop()[0]}</p>
                <div className='flex-1'>
                    <p className='text-[#0000008a]'>{name}</p>
                    <p className='text-[12px]'>Today</p>
                </div>
                <IconButton>
                    <DeleteIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#f5f5f5]"}`} />
                </IconButton>
            </div>
            {/* Chat container */}
            <div className={`flex-1 bg-white p-[10px] m-[10px] rounded-[20px] overflow-x-auto no-scrollbar shadow-xl ${lightThemeKey ? "" : "!bg-[#2d3941] !text-[#f5f5f5]"}`}>
                {
                    messages?.map((message, i) => (
                        message.sender._id === user._id ? <MessageSelf scrollRef={scrollRef} messageContent={message.content} key={i} /> : <MessageOthers scrollRef={scrollRef} messageSender={message.sender.name} messageContent={message.content} key={i} />
                        // <div>{message.content}</div>
                    ))
                }
            </div>
            <div className={`${lightThemeKey ? "bg-white" : "bg-[#2d3941]"} py-[8px] px-[15px] m-[10px] rounded-[20px] flex justify-between shadow-xl`}>
                <input type="text" placeholder='Type a message' className={`${lightThemeKey ? "" : "bg-[#2d3941] text-[#f5f5f5]"} outline-none border-none w-[100%] mr-4`} onChange={handleInputMessage} onKeyDown={handleEnterEvent} value={msg} />
                <IconButton onClick={handleSendMessage}>
                    <SendIcon className={`h-[1.25em] w-[1.25em] ${lightThemeKey ? "" : "!text-[#f5f5f5]"}`} />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatArea