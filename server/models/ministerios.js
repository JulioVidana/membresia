const { Schema, model } = require('mongoose')

const ministerioSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    tipo: { type: String, required: true },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    lider: [{ type: Schema.Types.ObjectId, ref: 'Persona' }],
    miembros: [{ type: Schema.Types.ObjectId, ref: 'Persona' }]
})

module.exports = model('ministerio', ministerioSchema)