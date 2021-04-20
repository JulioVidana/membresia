const router = require('express').Router()
const Usuarios = require('../models/usuarios')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
Joi.objectId = require('joi-objectid')(Joi)
const ObjectId = require('mongoose').Types.ObjectId
const requireSuperAdmin = require('../middleware/requireSuperAdmin')


router.get('/', async (req, res) => {
    await Usuarios.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.post('/', requireSuperAdmin, async (req, res) => {
    try {

        const existeEmail = await Usuarios.findOne({ email: req.body.email })
        if (existeEmail) throw Error('Ya existe usuario con ese correo')

        // hash contraseña
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        if (!hash) throw Error('Something went wrong hashing the password')

        const usuario = new Usuarios({
            nombre: req.body.nombre,
            email: req.body.email,
            password: hash,
            iglesia: ObjectId(req.body.iglesia),
            rol: req.body.rol
        })

        await usuario.save()

        const traeUsuarios = await Usuarios.find()
        res.json(traeUsuarios)

    } catch (error) {

        res.status(409).json({ msg: error.message })
    }
})


router.put('/:id', requireSuperAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        // hash contraseña
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password, salt)
        if (!hash) throw Error('Something went wrong hashing the password')
        let nuevosDatos

        if (data.password === '') {
            nuevosDatos = {
                $set: {
                    nombre: data.nombre,
                    activo: data.activo,
                    rol: data.rol,
                    iglesia: data.iglesia
                }
            }
        } else {
            nuevosDatos = {
                $set: {
                    nombre: data.nombre,
                    activo: data.activo,
                    password: hash,
                    rol: data.rol,
                    iglesia: data.iglesia
                }
            }
        }

        await Usuarios.updateOne(
            {
                _id: ObjectId(id)
            },
            nuevosDatos
        )

        const traeUsuarios = await Usuarios.find()
        res.json(traeUsuarios)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.delete('/:id', requireSuperAdmin, async (req, res) => {
    try {
        const { id } = req.params

        await Usuarios.findByIdAndDelete(id)

        const traeUsuarios = await Usuarios.find()
        res.json(traeUsuarios)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = router