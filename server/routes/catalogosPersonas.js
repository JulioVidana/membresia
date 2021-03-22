const router = require('express').Router()
const EdoCivil = require('../models/estadoCivil')
const Escolaridad = require('../models/escolaridad')
const Edades = require('../models/edades')
const TipoMiembros = require('../models/tipoMiembro')
const ObjectId = require('mongoose').Types.ObjectId
const { request, response } = require('express')



router.route('/edocivil').get(async (req, res, next) => {
    await EdoCivil.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.route('/escolaridad').get(async (req, res, next) => {
    await Escolaridad.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.route('/edades').get(async (req, res, next) => {
    await Edades.find()
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.route('/tipomiembros/:id').get(async (request, response, next) => {
    const { id } = request.params
    await TipoMiembros.find({ 'iglesia': new ObjectId(id) })
        .then(result => response.json(result))
        .catch(error => next(error))
})

router.route('/tipomiembros').post(async (request, response, next) => {
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

router.route('/tipomiembros/:id').put((request, response, next) => {
    const { id } = request.params
    const datos = request.body


    TipoMiembros.findByIdAndUpdate(id, { tipo: datos.tipo }, { new: true, useFindAndModify: false })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

router.route('/tipomiembros/:id').delete(async (request, response, next) => {
    const { id } = request.params

    const res = await TipoMiembros.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(400)

    response.status(204).end()
})

module.exports = router