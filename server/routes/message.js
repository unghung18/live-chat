const router = require('express').Router();
const messageControllers = require('../controllers/messageControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:chatId', authMiddleware.verifyToken, messageControllers.getAllMessages);
router.post('/', authMiddleware.verifyToken, messageControllers.sendMessage);

module.exports = router;