const router = require('express').Router()
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId
const requireAdmin = require('../middleware/requireAdmin')
const cloudinary = require('../utils/cloudinary')

//trae personas por iglesia
router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    await Personas.find({ iglesia: id, 'estatus.activo': true }).sort('-createdAt')
        .populate('civil')
        .populate('escolaridad')
        .populate('tipoMiembro', { iglesia: 0 })
        .populate('grupoEdad', { iglesia: 0 })
        .then(result => res.json(result))
        .catch(err => next(err))
})

//todas incluyendo los inactivos
router.get('/todas/:id', async (req, res, next) => {
    const { id } = req.params

    await Personas.find({ iglesia: id }).sort('-createdAt')
        .populate('civil')
        .populate('escolaridad')
        .populate('tipoMiembro', { iglesia: 0 })
        .populate('grupoEdad', { iglesia: 0 })
        .then(result => res.json(result))
        .catch(err => next(err))
})

router.get('/inactivos/:id', async (req, res, next) => {
    const { id } = req.params

    await Personas.find({ iglesia: id, 'estatus.activo': false })
        .populate('civil')
        .populate('escolaridad')
        .populate('tipoMiembro', { iglesia: 0 })
        .populate('grupoEdad', { iglesia: 0 })
        .then(result => res.json(result))
        .catch(err => next(err))
})


//AGREGAR NUEVA PERSONA
router.post('/add', requireAdmin, async (request, response, next) => {
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
router.post('/update', requireAdmin, async (request, response, next) => {
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
router.get('/persona/:id', async (req, res, next) => {
    const { id } = req.params

    await Personas.findById(id)
        .populate('civil')
        .populate('escolaridad')
        .populate('tipoMiembro', { iglesia: 0 })
        .populate('grupoEdad', { iglesia: 0 })
        .then(result =>
            res.json(result))
        .catch(err => next(err))
})

/* //TRAE LOS DATOS DE UNA PERSONA EN ESPECÍFICO
router.get('/persona/:id', async (req, res) => {
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
        .catch(err => res.status(400).json({ msg: err.message }))
}) */

//ACTUALIZA TIPO DE MIEMBRO
router.put('/tipomiembro/:id', requireAdmin, async (request, response, next) => {
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

/* router.route('/tipomiembro/:id').put((req, res, next) => {
    const { id } = req.params
    const datos = req.body

    return Personas.findById(id)
        .then(persona => {
            if (!persona)
                throw new Error('No existe Persona')
            persona.tipoMiembro = datos._id
            return persona.save()
        })
        .then(result => {
            res.json(result)
            return result
        })
        .catch(next)
        .then(persona => {
            if (persona && typeof persona.log === 'function') {
                const data = {
                    action: 'update-tipoMiembro',
                    persona: datos._id,
                    createdBy: datos.usuario
                }
                return persona.log(data)
            }
        })
        .catch(err => {
            console.log('Caught error while logging: ', err)
        })
}) */


//ESTATUS INACTIVO
router.put('/estatus/:id', requireAdmin, async (request, response, next) => {
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
router.put('/bautismo/:id', requireAdmin, async (request, response, next) => {
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
router.post('/delete/:id', async (request, response, next) => {
    const { id } = request.params
    const { rol } = request.user
    const idImagen = request.body.id
    const allowedRoles = ['superadmin', 'admin']
    try {

        if (!allowedRoles.includes(rol)) {
            return response.status(400).json({ msg: 'No tienes Permiso de Eliminar' })
        }

        //borrar Imagen
        if (idImagen !== undefined) {
            await cloudinary.uploader.destroy(idImagen)
        }

        //Borra Persona
        const borrar = await Personas.findByIdAndDelete(id)

        if (borrar === null) return response.sendStatus(404)

        response.status(204).end()


    } catch (error) {
        next(error)
    }

})



module.exports = router