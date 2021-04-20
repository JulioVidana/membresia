const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    /* const authorization = request.get('authorization')
     let token = ''
       if (authorization && authorization.toLowerCase().startsWith('bearer')) {
          token = authorization.substring(7)
      } */

    const token = req.cookies.iglesiapp_session
    const decodedToken = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { issuer: 'api.iglesiapp' }
    )

    if (!token || !decodedToken.id) {
        return res.status(401).json({ msg: 'token missing or invalid' })
    }

    req.user = decodedToken
    next()
}