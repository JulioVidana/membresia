const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const notaSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nota: { type: String, require: true },
    categoria: { type: String, require: true },
    persona: { type: ObjectId, ref: 'Persona' },
    createdBy: { type: ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date },
    iglesia: { type: ObjectId, ref: 'Iglesia' }
})

module.exports = model('Nota', notaSchema)