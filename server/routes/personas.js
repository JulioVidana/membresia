const router = require('express').Router()
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId



router.route('/:id').get(async (req, res) => {
    const { id } = req.params
    await Personas.aggregate(
        [
            {
                '$match': {
                    'estatus.activo': true,
                    'iglesia': new ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'estadoCivil',
                    'localField': 'civil',
                    'foreignField': '_id',
                    'as': 'civil'
                }
            }, {
                '$unwind': {
                    'path': '$civil'
                }
            }, {
                '$lookup': {
                    'from': 'escolaridad',
                    'localField': 'escolaridad',
                    'foreignField': '_id',
                    'as': 'escolaridad'
                }
            }, {
                '$unwind': {
                    'path': '$escolaridad'
                }
            },
            {
                '$addFields': {
                    'completo': {
                        '$concat': [
                            '$nombre', ' ', '$aPaterno', ' ', '$aMaterno'
                        ]
                    }
                }
            }
        ],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            res.send(result)
        }
    )
})

//AGREGAR NUEVA PERSONA
router.post('/add', async (request, response, next) => {
    //console.log(req.body)
    const persona = request.body
    try {
        const newPersona = new Personas({
            nombre: persona.nombre,
            aPaterno: persona.aPaterno,
            aMaterno: persona.aMaterno,
            nacimiento: persona.nacimiento,
            grupoEdad: persona.grupoEdad,
            sexo: persona.sexo,
            telefono: persona.telefono,
            email: persona.email,
            ciudad: persona.ciudad,
            calle: persona.calle,
            colonia: persona.colonia,
            cp: persona.cp,
            oficio: persona.oficio,
            iglesia: persona.iglesia,
            civil: persona.civil,
            escolaridad: persona.escolaridad
        })

        const savePersona = await newPersona.save()
        response.json({
            error: null,
            data: savePersona
        })
    } catch (error) {
        next(error)
    }


})
//ACTUALIZA DATOS GENERALES DE UNA PERSONA
router.post('/update', async (request, response, next) => {
    try {
        const persona = request.body
        const updatePersona = await Personas.updateOne(
            {
                _id: ObjectId(persona._id)
            },
            {
                $set: {
                    nombre: persona.nombre,
                    aPaterno: persona.aPaterno,
                    aMaterno: persona.aMaterno,
                    nacimiento: persona.nacimiento,
                    grupoEdad: persona.grupoEdad,
                    sexo: persona.sexo,
                    telefono: persona.telefono,
                    email: persona.email,
                    ciudad: persona.ciudad,
                    calle: persona.calle,
                    colonia: persona.colonia,
                    cp: persona.cp,
                    oficio: persona.oficio,
                    iglesia: persona.iglesia,
                    civil: persona.civil,
                    escolaridad: persona.escolaridad
                }
            }
        )
        response.json({
            error: null,
            data: updatePersona
        })
    } catch (error) {
        next(error)

    }
})

//TRAE LOS DATOS DE UNA PERSONA EN ESPECÍFICO
router.route('/persona/:id').get(async (req, res) => {
    const { id } = req.params
    //console.log('id persona', id)
    await Personas.aggregate(
        [
            {
                '$match': {
                    '_id': new ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'estadoCivil',
                    'localField': 'civil',
                    'foreignField': '_id',
                    'as': 'civil'
                }
            }, {
                '$unwind': {
                    'path': '$civil'
                }
            }, {
                '$lookup': {
                    'from': 'escolaridad',
                    'localField': 'escolaridad',
                    'foreignField': '_id',
                    'as': 'escolaridad'
                }
            }, {
                '$unwind': {
                    'path': '$escolaridad'
                }
            }, {
                '$addFields': {
                    'completo': {
                        '$concat': [
                            '$nombre', ' ', '$aPaterno', ' ', '$aMaterno'
                        ]
                    }
                }
            }
        ]
    )
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error ' + err))
})

//ACTUALIZA TIPO DE MIEMBRO
router.route('/tipomiembro/:id').put((request, response, next) => {
    const { id } = request.params
    const datos = request.body

    Personas.findByIdAndUpdate(
        id,
        { tipoMiembro: datos._id },
        { new: true, useFindAndModify: false })
        .then(() => {
            response.status(200).end()
        })
        .catch(error => next(error))

})

//ESTATUS INACTIVO
router.route('/inactivo/:id').put((request, response, next) => {
    const { id } = request.params
    const datos = request.body

    Personas.findByIdAndUpdate(
        id,
        {
            estatus: {
                activo: datos.activo,
                motivo: datos.motivo,
                fecha: datos.fecha
            }

        },
        { new: true, useFindAndModify: false })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error))

})

//AGREGA O ACTUALIZA BAUTISMO
router.route('/bautismo/:id').put((request, response, next) => {
    const { id } = request.params
    const datos = request.body

    Personas.findByIdAndUpdate(
        id,
        {
            bautismo: {
                activo: datos.activo,
                fecha: datos.fecha
            }

        },
        { new: true, useFindAndModify: false })
        .then(() => {
            response.status(200).end()
        })
        .catch(error => next(error))

})
//BORRAR USUARIO
router.route('/borrar/:id').delete(async (request, response, next) => {
    const { id } = request.params
    const borrar = await Personas.findByIdAndDelete(id)

    if (borrar === null) return response.sendStatus(404)

    response.status(204).end()
})



module.exports = router