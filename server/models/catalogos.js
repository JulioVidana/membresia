const { Schema, model } = require('mongoose')

const catalogoSchema = new Schema({
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    catalogos: [
        {
            id: { type: Number, default: 0 },
            nombre: { type: String, required: true },
            items: [
                {
                    _id: { type: Schema.ObjectId, auto: true },
                    tipo: { type: String, required: true },
                }
            ]
        }
    ]
})

module.exports = model('Catalogo', catalogoSchema)