const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ msg: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({ msg: 'token no es válido' })
    }
}

module.exports = verifyToken