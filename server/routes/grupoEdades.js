const router = require('express').Router()
const grupoEdades = require('../models/edades')
const ObjectId = require('mongoose').Types.ObjectId
const requireAdmin = require('../middleware/requireAdmin')



router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    await grupoEdades.find({ 'iglesia': new ObjectId(id) })
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.post('/', requireAdmin, async (req, res, next) => {
    const datos = req.body

    if (!datos.tipo) {
        return res.status(400).json({
            error: 'falta campo "tipo" '
        })
    }

    const newTipoMiembro = new grupoEdades({
        tipo: datos.tipo,
        iglesia: datos.iglesia
    })

    try {
        await newTipoMiembro.save()

        const traeTiposMiembros = await grupoEdades.find({ 'iglesia': new ObjectId(datos.iglesia) })
        res.json(traeTiposMiembros)

    } catch (error) {
        next(error)
    }


})

router.put('/:id', requireAdmin, async (req, res, next) => {
    const { id } = req.params
    const datos = req.body
    const user = req.user

    try {
        await grupoEdades.findByIdAndUpdate(
            id,
            {
                tipo: datos.tipo
            },
            {
                new: true, useFindAndModify: false
            }
        )

        const traeTiposMiembros = await grupoEdades.find({ 'iglesia': new ObjectId(user.iglesia) })
        res.json(traeTiposMiembros)

    } catch (error) {
        next(error)
    }

})

router.delete('/:id', requireAdmin, async (req, res, next) => {
    const { id } = req.params
    const user = req.user
    try {

        await grupoEdades.findByIdAndDelete(id)

        const traeTiposMiembros = await grupoEdades.find({ 'iglesia': new ObjectId(user.iglesia) })
        res.json(traeTiposMiembros)

    } catch (error) {
        next(error)
    }
})

module.exports = router