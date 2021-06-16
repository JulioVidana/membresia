const router = require('express').Router()
const Usuarios = require('../models/usuarios')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
Joi.objectId = require('joi-objectid')(Joi)
const ObjectId = require('mongoose').Types.ObjectId
const requireSuperAdmin = require('../middleware/requireSuperAdmin')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')

router.get('/', requireSuperAdmin, async (req, res) => {
    await Usuarios.find()
        .populate('iglesia')
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

        const traeUsuarios = await Usuarios.find().populate('iglesia')
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

        const traeUsuarios = await Usuarios.find().populate('iglesia')
        res.json(traeUsuarios)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.delete('/:id', requireSuperAdmin, async (req, res) => {
    try {
        const { id } = req.params

        await Usuarios.findByIdAndDelete(id)

        const traeUsuarios = await Usuarios.find().populate('iglesia')
        res.json(traeUsuarios)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

//SUBIR IMAGEN A CLOUDINARY
router.post('/imagen/:id', upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'usuarios/avatars/' })

        Usuarios.findByIdAndUpdate(
            id,
            {
                imagen: {
                    url: result.secure_url,
                    id: result.public_id
                }
            },
            { new: true, useFindAndModify: false })
            .then(() => {
                res.status(200).end()
            })
            .catch(error => next(error))


    } catch (error) {
        next(error)
    }

})

//CAMBIAR IMAGEN A CLOUDINARY
router.put('/imagen/:id', upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {
        let usuario = await Usuarios.findById(id)
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(usuario.imagen.id)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'usuarios/avatars/' })

        Usuarios.findByIdAndUpdate(
            id,
            {
                imagen: {
                    url: result.secure_url,
                    id: result.public_id
                }
            },
            { new: true, useFindAndModify: false })
            .then(() => {
                res.status(200).end()
            })
            .catch(error => next(error))


    } catch (error) {
        next(error)
    }

})
//BORRAR IMAGEN
router.post('/imagen/borrar/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(req.body.id)
        await Usuarios.findByIdAndUpdate(
            id,
            {
                $unset: { imagen: '' }
            },
            { new: true, useFindAndModify: false })
            .then(() => {
                res.status(200).end()
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }


})

module.exports = router