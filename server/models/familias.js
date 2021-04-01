const { Schema, model } = require('mongoose')
//const personaSchema = require('./personas').schema

const familasSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    familia: { type: String, required: true },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
    personas: [{ type: Schema.Types.ObjectId, ref: 'Persona' }]
    //personas: { type: [personaSchema] }
})

module.exports = model('Familia', familasSchema)