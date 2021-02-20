const router = require("express").Router();
const EdoCivil = require("../models/estadoCivil");
const Escolaridad = require("../models/escolaridad");
const Edades = require("../models/edades");


router.route('/edocivil').get(async (req, res) => {
    await EdoCivil.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/escolaridad').get(async (req, res) => {
    await Escolaridad.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/edades').get(async (req, res) => {
    await Edades.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;