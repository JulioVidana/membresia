const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nombre: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    email: { type: String, required: true, min: 6, max: 255 },
    activo: { type: Boolean, default: true },
    rol: { type: Number },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    imagen: { type: String }
});

module.exports = model("Usuario", usuarioSchema);