const router = require('express').Router()
const EdoCivil = require('../models/estadoCivil')
const Escolaridad = require('../models/escolaridad')
const Edades = require('../models/edades')
const TipoMiembros = require('../models/tipoMiembro')
const ObjectId = require('mongoose').Types.ObjectId
const requireAdmin = require('../middleware/requireAdmin')


router.get('/edocivil', async (req, res, next) => {
    await EdoCivil.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.get('/escolaridad', async (req, res, next) => {
    await Escolaridad.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.get('/edades', async (req, res, next) => {
    await Edades.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.get('/tipomiembros/:id', async (request, response, next) => {
    const { id } = request.params
    await TipoMiembros.find({ 'iglesia': new ObjectId(id) })
        .then(result => response.json(result))
        .catch(error => next(error))
})

router.post('/tipomiembros', requireAdmin, async (request, response, next) => {
    const datos = request.body

    if (!datos.tipo) {
        return response.status(400).json({
            error: 'falta campo "tipo" '
        })
    }

    const newTipoMiembro = new TipoMiembros({
        tipo: datos.tipo,
        iglesia: datos.iglesia
    })

    try {
        const saveTipoMiembro = await newTipoMiembro.save()
        response.json(saveTipoMiembro)
    } catch (error) {
        next(error)
    }


})

router.put('/tipomiembros/:id', requireAdmin, async (request, response, next) => {
    const { id } = request.params
    const datos = request.body


    TipoMiembros.findByIdAndUpdate(id, { tipo: datos.tipo }, { new: true, useFindAndModify: false })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

router.delete('/tipomiembros/:id', requireAdmin, async (request, response, next) => {
    const { id } = request.params
    try {

        const res = await TipoMiembros.findByIdAndDelete(id)
        if (res === null) return response.sendStatus(400)

        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = router