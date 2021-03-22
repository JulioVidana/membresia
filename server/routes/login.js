const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()
const Usuario = require('../models/usuarios')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const auth = require('../middleware/validate-token')

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

LoginRouter.post('/', async (req, res) => {

    try {
        // validaciones
        const { error } = schemaLogin.validate(req.body)
        if (error) throw Error(error.details[0].message)

        const user = await Usuario.findOne({ email: req.body.email })
        if (!user) throw Error('Usuario no existe')


        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) throw Error('Contraseña incorrecta')

        // create token
        const token = jwt.sign({
            nombre: user.nombre,
            id: user._id,
            activo: user.activo,
            rol: user.rol,
            img: user.img
        }, process.env.TOKEN_SECRET)

        res.header('x-auth-token', token).json({
            error: null,
            data: { token }
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

LoginRouter.get('/datosuser', auth, async (req, res) => {
    try {
        const user = await Usuario.findById(req.user.id).select('-password')
        if (!user) throw Error('Usuario no existe')
        res.json(user)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

module.exports = LoginRouter