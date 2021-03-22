const router = require('express').Router()
const Iglesias = require('../models/iglesias')
const ObjectId = require('mongoose').Types.ObjectId


router.route('/').get(async (req, res) => {
    await Iglesias.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', async (req, res) => {
    try {

        const iglesia = new Iglesias({
            nombre: req.body.nombre,
            cobertura: req.body.cobertura,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            pastor: req.body.pastor,
            contacto: req.body.contacto
        })

        const saveIglesia = await iglesia.save()
        res.json({
            error: null,
            data: saveIglesia
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.post('/update', async (req, res) => {
    try {
        const updateIglesia = await Iglesias.updateOne(
            {
                _id: ObjectId(req.body._id)
            },
            {
                $set: {
                    nombre: req.body.nombre,
                    cobertura: req.body.cobertura,
                    pais: req.body.pais,
                    ciudad: req.body.ciudad,
                    pastor: req.body.pastor,
                    contacto: req.body.contacto
                }
            }
        )
        res.json({
            error: null,
            data: updateIglesia
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
})


router.post('/delete', async (req, res) => {
    try {
        const deleteIglesia = await Iglesias.deleteOne(
            {
                _id: ObjectId(req.body._id)
            }
        )
        res.json({
            error: null,
            data: deleteIglesia
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = router