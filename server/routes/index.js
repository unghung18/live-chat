const authRouter = require('./auth');
const chatRouter = require('./chat');
const messageRouter = require('./message');

function route(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/chat', chatRouter)
    app.use('/api/message', messageRouter)
}
module.exports = route;