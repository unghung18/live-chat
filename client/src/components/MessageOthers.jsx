import React from 'react'

const MessageOthers = ({ messageContent, messageSender, scrollRef }) => {
    return (
        <div>
            <div className='flex items-center gap-[10px] p-[10px] m-[10px] rounded-[20px]' ref={scrollRef}>
                <p className='w-10 h-10 rounded-[50%] bg-[#d9d9d9] flex justify-center items-center font-black text-[1.5rem] text-white'>{messageSender.split(" ").pop()[0]}</p>
                <div className='bg-[#d9d9d9] rounded-t-[20px] rounded-br-[20px] py-[15px] px-[10px]'>
                    <p className='text-[#0000008a]'>{messageSender}</p>
                    <p className='text-[12px] font-light'>{messageContent}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageOthers