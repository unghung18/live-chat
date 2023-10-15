const express = require('express');
const route = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

// Connect database
connectDb();

//routes
route(app);

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {

    socket.on('send-msg', (msg) => {
        io.to(msg.chat._id).emit('server-send-message', msg);
    })

    socket.on("join-chat", (room) => {
        console.log("ai do")
        socket.join(room);
    })

})