const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

const LogSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    persona: { type: ObjectId, ref: 'Persona', required: true },
    createdBy: { type: ObjectId, ref: 'Usuario', required: true },
    action: { type: String, required: true },
    diff: { type: Schema.Types.Mixed }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})


module.exports = mongoose.model('Log', LogSchema)