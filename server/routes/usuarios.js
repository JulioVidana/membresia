const router = require('express').Router()
const Usuarios = require('../models/usuarios')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
Joi.objectId = require('joi-objectid')(Joi)
const ObjectId = require('mongoose').Types.ObjectId

router.route('/').get(async (req, res) => {
    await Usuarios.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
})


router.post('/register', async (req, res) => {
    try {

        const existeEmail = await Usuarios.findOne({ email: req.body.email })
        if (existeEmail) throw Error('User already exists')

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

        const savedUser = await usuario.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


router.post('/update', async (req, res) => {
    try {

        // hash contraseña
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        if (!hash) throw Error('Something went wrong hashing the password')
        let datos

        if (req.body.password === '') {
            datos = {
                $set: {
                    nombre: req.body.nombre,
                    activo: req.body.activo,
                    rol: req.body.rol,
                    iglesia: req.body.iglesia
                }
            }
        } else {
            datos = {
                $set: {
                    nombre: req.body.nombre,
                    activo: req.body.activo,
                    password: hash,
                    rol: req.body.rol,
                    iglesia: req.body.iglesia
                }
            }
        }
        const updatedUser = await Usuarios.updateOne(
            {
                _id: ObjectId(req.body._id)
            },
            datos
        )
        res.json({
            error: null,
            data: updatedUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/baja', async (req, res) => {
    try {
        const updatedUser = await Usuarios.updateOne(
            {
                _id: ObjectId(req.body._id)
            },
            {
                $set: {
                    activo: false,
                }
            }
        )
        res.json({
            error: null,
            data: updatedUser
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
/* router.post('/delete', async (req, res) => {
    try {

        const deletedUser = await Usuarios.deleteOne(
            {
                _id: ObjectId(req.body._id)
            }
        )
        res.json({
            error: null,
            data: deletedUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}) */

module.exports = router