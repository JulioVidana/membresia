const { Schema, model } = require('mongoose');

const escolaridadSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    escolaridad: { type: String, required: true }
},
    { collection: "escolaridad" }
);

module.exports = model("Escolaridad", escolaridadSchema);