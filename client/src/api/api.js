import axiosClient from "./axiosClient";
const apis = {
    loginUser: (user) => {
        return axiosClient.post('/auth/login', user);
    },
    registerUser: (user) => {
        return axiosClient.post('/auth/register', user);
    },
    fetchAllUsers: (keyword) => {
        return axiosClient.get('/auth/fetchUsers', { params: { search: keyword } });
    },
    fetchAllGroups: (keyword) => {
        return axiosClient.get('/chat/fetchGroups', { params: { search: keyword } })
    },
    createGroups: (chatName) => {
        return axiosClient.post('/chat/createGroups', { chatName: chatName });
    },
    addSelfToGroup: (chatId) => {
        return axiosClient.put('/chat/addSelfToGroup', { chatId: chatId })
    },
    accessChat: (userId) => {
        return axiosClient.post('/chat', { userId: userId })
    },
    fetchChats: () => {
        return axiosClient.get('/chat')
    },
    getAllMessages: (chatId) => {
        return axiosClient.get(`/message/${chatId}`)
    },
    sendMessage: (data) => {
        return axiosClient.post('/message', data)
    },

}
export default apis;