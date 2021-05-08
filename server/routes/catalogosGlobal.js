const router = require('express').Router()
const EdoCivil = require('../models/estadoCivil')
const Escolaridad = require('../models/escolaridad')
const Edades = require('../models/edades')
const TipoMiembros = require('../models/tipoMiembro')
const ObjectId = require('mongoose').Types.ObjectId


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

router.get('/edades/:id', async (req, res, next) => {
    const { id } = req.params
    await Edades.find({ 'iglesia': new ObjectId(id) }, { iglesia: 0 })
        .then(result => res.json(result))
        .catch(error => next(error))
})

router.get('/tipomiembros/:id', async (req, res, next) => {
    const { id } = req.params
    await TipoMiembros.find({ 'iglesia': new ObjectId(id) }, { iglesia: 0 })
        .then(result => res.json(result))
        .catch(error => next(error))
})


module.exports = router