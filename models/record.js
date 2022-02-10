const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
    challengeKey: String,
    reps: Number,
    user: String,
    date: Date
}, {
    collection: 'records'
})

module.exports = mongoose.model('Records', RecordSchema)