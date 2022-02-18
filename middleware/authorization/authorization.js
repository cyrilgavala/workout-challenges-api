const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user.username
            next()
        });
    } else {
        res.sendStatus(401)
    }
}