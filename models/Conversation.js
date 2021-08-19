const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        members: [{type: Schema.Types.ObjectId, ref: 'User'}],
        lastMessage: {type: String, default: 'no available messages'}
    },

    {timestamps: true}
)

module.exports = model('Conversation', schema)