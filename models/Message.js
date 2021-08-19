const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        conversation: {type: Types.ObjectId, ref: 'Conversation', required: true},
        sender: {type: Types.ObjectId, ref: 'User', required: true},
        text: {type: String, required: true}
    },
    {timestamps: true}
)

module.exports = model('Message', schema)