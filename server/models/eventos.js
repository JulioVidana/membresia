const { Schema, model } = require('mongoose')

const eventoSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    evento: { type: String, required: true },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    horario: [
        {
            _id: { type: Schema.ObjectId, auto: true },
            horario: { type: String }
        }
    ]
})
module.exports = model('Evento', eventoSchema)
