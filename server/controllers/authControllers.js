const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authControllers = {
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user._id
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '30d' }
        )
    },
    loginUser: async (req, res) => {
        try {
            const checkedUser = await User.findOne({ email: req.body.email })
            if (!checkedUser) {
                return res.status(401).json({ message: "Invalid email" })
            }
            const validPassword = await bcrypt.compare(req.body.password, checkedUser.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid password" })
            }
            if (checkedUser && validPassword) {
                const accessToken = authControllers.generateAccessToken(checkedUser);
                returnUser = checkedUser.toObject();
                return res.status(200).json({ ...returnUser, accessToken });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    },
    registerUser: async (req, res) => {
        try {
            const checkedUser = await User.findOne({ email: req.body.email })
            if (checkedUser) {
                return res.status(422).json({ message: "Email already taken" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            res.status(201).json({ message: "User created successfully" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    },
    fetchAllUsers: async (req, res) => {
        try {
            const keyword = req.query.search ?

                { name: { $regex: req.query.search, $options: "i" } }
                : {};

            const users = await User.find(keyword).find({
                _id: { $ne: req.userId }
            })
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}
module.exports = authControllers;