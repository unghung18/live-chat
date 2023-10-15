const Chat = require("../models/Chat");
const User = require("../models/User");
const chatControllers = {
    accessChat: async (req, res) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: "UserId param not sent with request" })
            }
            var isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: req.userId } } },
                    { users: { $elemMatch: { $eq: userId } } }
                ]
            })
                .populate("users", "-password")
                .populate("latestMessage");

            if (isChat.length > 0) {
                res.status(200).json(isChat[0])
            }
            else {
                const createdChat = await Chat.create({
                    chatName: "sender",
                    isGroupChat: false,
                    users: [req.userId, userId]
                });
                const chatData = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );
                res.status(200).json(chatData);
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    fetchChats: async (req, res) => {
        try {
            const chatDatas = await Chat.find({ users: { $elemMatch: { $eq: req.userId } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate({
                    path: "latestMessage",
                    model: "Message",
                    populate: {
                        path: "sender",
                        model: "User",
                    }
                })
                .sort({ updatedAt: -1 });
            res.status(200).json(chatDatas)
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createGroups: async (req, res) => {
        try {
            if (!req.body.chatName) {
                return res.status(400).json({ message: "Data is insufficient" })
            }
            var users = []
            users.push(req.userId)
            const groupData = await Chat.create({
                chatName: req.body.chatName,
                users: users,
                isGroupChat: true,
                groupAdmin: req.userId
            })
            const group = await Chat.findOne({ _id: groupData._id })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
            res.status(200).json(group);

        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    fetchGroups: async (req, res) => {
        try {
            /*    const groupsData = await Chat.where("isGroupChat").equals(true);
               res.status(200).json(groupsData) */

            const keyword = req.query.search ?

                {
                    chatName: { $regex: req.query.search, $options: "i" },
                    isGroupChat: true
                }
                : {
                    isGroupChat: true
                };

            const GroupData = await Chat.find(keyword)
            res.status(200).json(GroupData);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    addSeflToGroup: async (req, res) => {
        try {
            const { chatId } = req.body;

            const checkedGroup = await Chat.findOne({
                _id: chatId,
                users: { $elemMatch: { $eq: req.userId } }
            })

            if (checkedGroup) {
                return res.status(200).json(checkedGroup)
            }

            const chatData = await Chat.findOneAndUpdate(
                {
                    _id: chatId,
                    users: { $nin: [req.userId] },
                },
                {
                    $push: { users: req.userId }
                },
                {
                    new: true
                })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
            console.log(chatData)
            if (!chatData) {
                return res.status(404).json({ message: "You already in group" })
            }
            res.status(200).json(chatData)
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    exitGroup: async (req, res) => {
        try {
            const { chatId } = req.body;

            // check if the requester is admin

            const removed = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $pull: { users: req.userId },
                },
                {
                    new: true,
                }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");

            if (!removed) {
                return res.status(404).json({ message: "Chat Not Found" });
            }
            res.status(200).json(removed);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = chatControllers;