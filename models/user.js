const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    pass: String
}, {
    collection: 'users'
})

module.exports = mongoose.model('Users', UserSchema)