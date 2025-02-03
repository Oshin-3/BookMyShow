const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log("token -> ", req.headers.authorization)

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log("verified token -> ",  verifiedToken)

        req.body.userId = verifiedToken.userId
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Token invalid"
        })
    }
}

module.exports = {
    auth
}