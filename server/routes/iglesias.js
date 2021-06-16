const router = require('express').Router()
const Iglesias = require('../models/iglesias')
const TipoMiembros = require('../models/tipoMiembro')
const grupoEdades = require('../models/edades')
const Ministerios = require('../models/ministerios')
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId
const requireSuperAdmin = require('../middleware/requireSuperAdmin')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')

router.get('/', requireSuperAdmin, async (req, res) => {
    await Iglesias.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/', requireSuperAdmin, async (req, res) => {
    try {

        const iglesia = new Iglesias({
            nombre: req.body.nombre,
            cobertura: req.body.cobertura,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            pastor: req.body.pastor,
            contacto: req.body.contacto
        })

        const nuevaIglesia = await iglesia.save()

        TipoMiembros.insertMany([
            { tipo: 'Miembro', iglesia: nuevaIglesia._id },
            { tipo: 'Visita', iglesia: nuevaIglesia._id },
            { tipo: 'En Proceso', iglesia: nuevaIglesia._id },
            { tipo: 'VIP', iglesia: nuevaIglesia._id }
        ])

        grupoEdades.insertMany([
            { tipo: 'Adulto', iglesia: nuevaIglesia._id },
            { tipo: 'Adolescente', iglesia: nuevaIglesia._id },
            { tipo: 'Niño', iglesia: nuevaIglesia._id }
        ])

        Ministerios.insertMany([
            { tipo: 'Música', iglesia: nuevaIglesia._id },
            { tipo: 'Maestros', iglesia: nuevaIglesia._id },
            { tipo: 'Evangelismo', iglesia: nuevaIglesia._id },
            { tipo: 'VIP', iglesia: nuevaIglesia._id }
        ])


        const traeIglesias = await Iglesias.find()
        res.json(traeIglesias)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.put('/:id', requireSuperAdmin, async (req, res) => {
    try {

        const { id } = req.params
        const data = req.body

        await Iglesias.updateOne(
            {
                _id: ObjectId(id)
            },
            {
                $set: {
                    nombre: data.nombre,
                    cobertura: data.cobertura,
                    pais: data.pais,
                    ciudad: data.ciudad,
                    pastor: data.pastor,
                    contacto: data.contacto
                }
            }
        )

        const traeIglesias = await Iglesias.find()
        res.json(traeIglesias)

    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
})


router.delete('/:id', requireSuperAdmin, async (req, res) => {
    try {
        const { id } = req.params

        const getPersonas = await Personas.find({ iglesia: id })

        if (getPersonas.length > 0) {
            res.status(401).json({
                msg: 'No se puede Borrar, porque tiene al menos un registro '
            })
            return
        }
        await Iglesias.findByIdAndDelete(id)

        //Borra Catálogos
        await TipoMiembros.deleteMany({ iglesia: id })
        await grupoEdades.deleteMany({ iglesia: id })
        await Ministerios.deleteMany({ iglesia: id })


        const traeIglesias = await Iglesias.find()
        res.json(traeIglesias)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


//SUBIR LOGO A CLOUDINARY
router.post('/logo/:id', requireSuperAdmin, upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'iglesias/logos/' })

        Iglesias.findByIdAndUpdate(
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

//CAMBIAR LOGO A CLOUDINARY
router.put('/logo/:id', requireSuperAdmin, upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {
        let iglesia = await Iglesias.findById(id)
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(iglesia.imagen.id)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'iglesias/logos/' })

        Iglesias.findByIdAndUpdate(
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
//BORRAR LOGO
router.post('/logo/borrar/:id', requireSuperAdmin, async (req, res, next) => {
    const { id } = req.params
    try {
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(req.body.id)
        await Iglesias.findByIdAndUpdate(
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