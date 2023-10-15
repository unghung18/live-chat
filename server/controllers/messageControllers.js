const Message = require("../models/Message");
const Chat = require("../models/Chat");

const messageControllers = {
    getAllMessages: async (req, res) => {
        try {
            const messagesData = await Message.find({ chat: req.params.chatId })
                .populate("sender", "name email")
                .populate("receiver")
                .populate("chat")
            res.status(200).json(messagesData);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    sendMessage: async (req, res) => {
        const { content, chatId } = req.body;
        try {
            if (!content || !chatId) {
                return res.status(400).json({ message: "Data is incifinent" })
            }
            const messageData = await Message.create({
                sender: req.userId,
                content: content,
                chat: chatId
            })

            const message = await Message.findOne({ _id: messageData._id })
                .populate("sender", "name email")
                .populate("receiver")
                .populate("chat")

            await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
            res.status(200).json(message)
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = messageControllers;