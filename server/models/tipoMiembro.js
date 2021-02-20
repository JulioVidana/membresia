const { Schema } = require('mongoose');

const tipoMiembroSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    tipo: { type: String, required: true },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
});

module.exports = model("TipoMiembro", tipoMiembroSchema);