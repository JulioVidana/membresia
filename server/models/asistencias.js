const { Schema, model } = require('mongoose')

const asistSchema = new Schema({
    _id: { type: Schema.ObectId, auto: true },
    evento: { type: Schema.Types.ObjectId, ref: 'Evento' },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' }
}, {
    timestamps: true
}
)

module.exports = model('Asistencia', asistSchema)