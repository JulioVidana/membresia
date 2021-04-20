const router = require('express').Router()
const Iglesias = require('../models/iglesias')
const ObjectId = require('mongoose').Types.ObjectId
const requireSuperAdmin = require('../middleware/requireSuperAdmin')

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

        await iglesia.save()

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
        await Iglesias.findByIdAndDelete(id)

        const traeIglesias = await Iglesias.find()
        res.json(traeIglesias)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


module.exports = router