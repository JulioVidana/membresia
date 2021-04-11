const router = require('express').Router()
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId


router.post('/bautismos', async (req, res, next) => {
    const { year, idIglesia } = req.body

    await Personas.aggregate(
        [
            {
                '$match': {
                    'iglesia': new ObjectId(idIglesia),
                    'bautismo.activo': true
                }
            }, {
                '$project': {
                    'bautismo': 1,
                    'year': {
                        '$year': '$bautismo.fecha'
                    },
                    'month': {
                        '$month': '$bautismo.fecha'
                    }
                }
            }, {
                '$match': {
                    'year': year
                }
            }
        ]
    )
        .then(result => res.json(result))
        .catch(err => next(err))



})

module.exports = router