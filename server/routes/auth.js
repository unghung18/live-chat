const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authControllers.loginUser);
router.post('/register', authControllers.registerUser);
router.get('/fetchUsers', authMiddleware.verifyToken, authControllers.fetchAllUsers);

module.exports = router;