const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
                if (err) {
                    res.sendStatus(403).json({ message: 'Forbidden' });
                }
                else {
                    req.userId = data.id
                    next();
                }
            })
        }
        else {
            res.sendStatus(401).json({ message: "Unauthorized" });
        }
    }
}
module.exports = authMiddleware;