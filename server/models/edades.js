const { Schema, model } = require('mongoose')


const edadesSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    grupo: { type: String, required: true }
})

module.exports = model('Edade', edadesSchema)