const router = require('express').Router()
const Familias = require('../models/familias')
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId

//familia en específico
router.route('/:id').get(async (req, res, next) => {
    const { id } = req.params

    await Familias.findById(id).populate('personas')
        .then(result => res.json(result))
        .catch(err => next(err))
})

//Trae Familia de persona
router.get('/persona/:id', async (req, res, next) => {
    const { id } = req.params

    await Familias.findOne(
        { personas: id }
    ).populate('personas')
        .then(result => res.json(result))
        .catch(err => next(err))

})

//Nueva Familia
router.route('/').post(async (req, res, next) => {
    try {
        const datos = req.body

        const newFamilia = new Familias({
            familia: datos.familia,
            iglesia: datos.iglesia,
            personas: datos.personas
        })

        const saveFamilia = await newFamilia.save()

        await Personas.updateMany(
            { _id: { $in: datos.personas } },
            { $set: { familia: saveFamilia._id } },
            { multi: true }
        )
            .then(() => {
                Familias.populate(saveFamilia, { path: 'personas' })
                    .then(fami => {
                        res.json(fami)
                    })
            })


    } catch (error) {
        next(error)
    }
})

//Actualiza Familia 
router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const datos = req.body

    try {

        await Personas.updateMany(
            { familia: ObjectId(id) },
            { $unset: { familia: '' } }
        )

        await Personas.updateMany(
            { _id: { $in: datos.personas } },
            { $set: { familia: id } },
            { multi: true }
        )

        const updateFam = await Familias.findByIdAndUpdate(
            id,
            {
                $set:
                {
                    personas: datos.personas,
                    familia: datos.familia
                }
            },
            { new: true, useFindAndModify: false }
        )

        await Familias.populate(updateFam, { path: 'personas' })
            .then(result => {
                res.json(result)
            })



    } catch (error) {
        next(error)
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        await Personas.updateMany(
            { familia: ObjectId(id) },
            { $unset: { familia: '' } }
        )
        const borraFamilia = await Familias.findByIdAndDelete(id)

        if (borraFamilia === null) return res.sendStatus(404)

        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

//todas las familias de la iglesia
router.route('/todas/:id').get(async (req, res, next) => {
    const { id } = req.params

    await Familias.find({ 'iglesia': new ObjectId(id) }).populate('personas')
        .then(result => res.json(result))
        .catch(err => next(err))
})

module.exports = router