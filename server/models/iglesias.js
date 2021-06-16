const { Schema, model } = require('mongoose')

const iglesiaSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nombre: { type: String, required: true, min: 3, max: 255 },
    cobertura: { type: String, required: true, min: 3, max: 255 },
    pais: { type: String, required: true, min: 2, max: 40 },
    ciudad: { type: String, required: true, min: 3, max: 255 },
    pastor: { type: String, required: true, min: 3, max: 255 },
    contacto: { type: String },
    activo: { type: Boolean, default: true },
    imagen: {
        url: String,
        id: String
    }
})

module.exports = model('Iglesia', iglesiaSchema)