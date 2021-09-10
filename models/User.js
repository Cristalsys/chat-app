const {Schema, model} = require('mongoose')

const schema = new Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, minlength: 4, required: true},
    avatar: {type: String, default: ''},
    resetLink: {type: String, default: ''}
})

module.exports = model('User', schema)