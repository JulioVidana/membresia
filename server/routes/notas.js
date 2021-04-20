const router = require('express').Router()
const Nota = require('../models/Nota')

router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    await Nota.find({ persona: id })
        .sort({ fecha: 'desc' })
        .populate('createdBy', {
            nombre: 1,
            email: 1
        })
        .then(result => res.json(result))
        .catch(err => next(err))

})

router.get('/global/:id', async (req, res, next) => {
    const { id } = req.params

    await Nota.find({ iglesia: id })
        .sort({ fecha: 'desc' })
        .populate('createdBy', {
            nombre: 1,
            email: 1
        })
        .populate({
            path: 'persona',
            populate: { path: 'civil' },
        })
        .populate({
            path: 'persona',
            populate: { path: 'escolaridad' },
        })
        .populate({
            path: 'persona',
            populate: { path: 'tipoMiembro', select: { iglesia: 0 } },
        })
        .then(result => res.json(result))
        .catch(err => next(err))

})

router.post('/', async (req, res, next) => {
    const datos = req.body
    const { rol } = req.user

    try {
        if (rol === 'consulta') {
            return res.status(400).json({ msg: 'No tienes Permiso de Crear Nota' })
        }
        const newNota = new Nota({
            nota: datos.nota,
            categoria: datos.categoria,
            persona: datos.persona,
            createdBy: datos.usuario,
            fecha: datos.fecha,
            iglesia: datos.iglesia
        })

        await newNota.save()
        const TraeNotas = await Nota.find({ persona: datos.persona })
            .sort({ fecha: 'desc' })
            .populate('createdBy', {
                nombre: 1,
                email: 1
            })
        res.json(TraeNotas)

    } catch (error) {
        next(error)
    }

})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    const { rol } = req.user
    const allowedRoles = ['superadmin', 'admin']

    try {
        if (!allowedRoles.includes(rol)) {
            return res
                .status(400).json({ msg: 'No tienes Permiso de eliminar Nota' })
        }

        const borrar = await Nota.findByIdAndDelete(id)
        if (borrar === null) return res.sendStatus(404)
        res.status(204).end()

    } catch (error) {
        next(error)
    }
})

module.exports = router