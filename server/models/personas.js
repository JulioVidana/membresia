const { Schema, model } = require('mongoose');

const personaSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nombre: { type: String, required: true, min: 3, max: 255 },
    aPaterno: { type: String, required: true, min: 3, max: 255 },
    aMaterno: { type: String, min: 3, max: 255 },
    nacimiento: { type: Date },
    grupoEdad: { type: String },
    sexo: { type: String },
    telefono: { type: Number },
    email: { type: String, min: 6, max: 255 },
    calle: { type: String, min: 3, max: 255 },
    colonia: { type: String, min: 3, max: 255 },
    cp: { type: String, min: 3, max: 255 },
    oficio: { type: String, min: 3, max: 255 },
    notaMedica: { type: String, min: 3, max: 1024 },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    civil: { type: Schema.Types.ObjectId, ref: 'EstadoCivil' },
    escolaridad: { type: Schema.Types.ObjectId, ref: 'Escolaridad' },
    tipoMiembro: { type: Schema.Types.ObjectId, ref: 'TipoMiembro' },
    familia: { type: Schema.Types.ObjectId, ref: 'Familia' },
    bautismo: {},
    estatus: {},
    estatus: {
        activo: { type: Boolean, default: true },
        motivo: { type: String },
        fecha: { type: Date }
    },
    imagen: { type: String }
}, {
    timestamps: true
});

module.exports = model("Persona", personaSchema);