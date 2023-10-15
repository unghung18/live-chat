import React from 'react'

const MessageSelf = ({ messageContent, scrollRef }) => {
    return (
        <>
            <div className='flex justify-end' ref={scrollRef}>
                <div className='bg-[#63d7b0] p-[15px] m-[10px] rounded-t-[20px] rounded-bl-[20px]'>
                    <p>{messageContent}</p>
                </div>
            </div>
        </>
    )
}

export default MessageSelf