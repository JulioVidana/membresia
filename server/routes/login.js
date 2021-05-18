const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Usuario = require('../models/usuarios')
const requireAuth = require('../middleware/requireAuth')

loginRouter.post('/', async (request, response, next) => {
    const { body } = request
    //const { email, password } = body

    try {

        const user = await Usuario.findOne({ email: body.email })
            .populate('iglesia').lean()
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.password)

        if (!(user && passwordCorrect)) {
            response.status(401).json({
                msg: 'Usuario o contraseña inválida'
            })
            return
        }

        const { password, iglesia, ...rest } = user
        const userInfo = Object.assign({}, { ...rest })

        //Create Token
        const userForToken = {
            id: user._id,
            email: user.email,
            rol: user.rol,
            iglesia: user.iglesia._id,
            iss: 'api.iglesiapp'
        }

        const token = jwt.sign(
            userForToken,
            process.env.TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            }
        )
        const decodedToken = jwtDecode(token)
        const expiresAt = decodedToken.exp

        response.cookie('iglesiapp_session', token, {
            httpOnly: true
        })

        response.send({
            token,
            userInfo,
            iglesia,
            expiresAt
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

loginRouter.get('/profile', requireAuth, async (req, res) => {
    try {

        const user = await Usuario.findById(req.userId).select('-password')
            .populate('iglesia')
        if (!user) throw Error('Usuario no existe')
        res.json(user)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

module.exports = loginRouter