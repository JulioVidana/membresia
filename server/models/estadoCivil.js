const { Schema, model } = require('mongoose')

const estadoCivilSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    estado: { type: String, required: true }
}, {
    collection: 'estadoCivil'
})

module.exports = model('EstadoCivil', estadoCivilSchema)