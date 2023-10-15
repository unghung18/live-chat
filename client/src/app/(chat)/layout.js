import MainContainer from '@/components/MainContainer'
import React from 'react'

const ChatLayout = ({ children }) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default ChatLayout