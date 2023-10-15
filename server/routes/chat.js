const router = require('express').Router();
const chatControllers = require('../controllers/chatControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, chatControllers.accessChat);
router.get('/', authMiddleware.verifyToken, chatControllers.fetchChats);
router.post('/createGroups', authMiddleware.verifyToken, chatControllers.createGroups);
router.get('/fetchGroups', authMiddleware.verifyToken, chatControllers.fetchGroups);
router.put('/addSelfToGroup', authMiddleware.verifyToken, chatControllers.addSeflToGroup);
router.post('/exitGroup', authMiddleware.verifyToken, chatControllers.exitGroup);
module.exports = router;