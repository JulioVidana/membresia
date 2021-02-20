const router = require("express").Router();
const Personas = require('../models/personas')
const ObjectId = require('mongoose').Types.ObjectId;


router.route('/').get(async (req, res) => {
    await Personas.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
    try {
        const persona = new Personas({
            nombre: req.body.nombre,
            aPaterno: req.body.aPaterno,
            aMaterno: req.body.aMaterno,
            nacimiento: req.body.nacimiento,
            grupoEdad: req.body.grupoEdad,
            sexo: req.body.genero,
            telefono: req.body.telefono,
            email: req.body.email,
            calle: req.body.calle,
            colonia: req.body.colonia,
            cp: req.body.cp,
            oficio: req.body.oficio,
            iglesia: req.body.iglesia._id,
            civil: req.body.civil
        })

        const savePersona = await persona.save();

        res.json({
            error: null,
            data: savePersona
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })

    }
})

module.exports = router