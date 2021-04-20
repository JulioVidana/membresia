const router = require('express').Router()
const Personas = require('../models/personas')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const requireAdmin = require('../middleware/requireAdmin')



//SUBIR IMAGEN A CLOUDINARY
router.route('/:id').post(requireAdmin, upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'iglesias/avatars/' })

        Personas.findByIdAndUpdate(
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
router.route('/:id').put(requireAdmin, upload.single('imagen'), async (req, res, next) => {
    const { id } = req.params
    try {
        let persona = await Personas.findById(id)
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(persona.imagen.id)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'iglesias/avatars/' })

        Personas.findByIdAndUpdate(
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

router.post('/borrar/:id', requireAdmin, async (req, res, next) => {
    const { id } = req.params
    try {
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(req.body.id)
        await Personas.findByIdAndUpdate(
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

/* 
//SUBIR IMAGEN A DIRECTORIO DEL MISMO BACKEND
router.route('/imagen/:id').post(async (req, res, next) => {
    const { id } = req.params
    const conf = {
        limits: { fileSize: 1000000 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads/avatars')
            },
            filename: (req, file, cb) => {
                cb(null, id + '.jpg')
            },

        })

    }

    const upload = multer(conf).single('imagen')

    upload(req, res, async (err) => {
        console.log('imagen datos:', req.file)

        if (!err) {
            Personas.findByIdAndUpdate(
                id,
                {
                    imagen: req.file.path
                },
                { new: true, useFindAndModify: false })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(error => next(error))
        } else {
            console.log(err)
            next(err)
        }
    })


}) */




module.exports = router