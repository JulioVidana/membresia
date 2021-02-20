const { Schema } = require("mongoose");

const familasSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    familia: { type: String, required: true },
    iglesia: { type: Schema.Types.ObjectId, ref: 'Iglesia' },
});

module.exports = model("Familias", familasSchema);