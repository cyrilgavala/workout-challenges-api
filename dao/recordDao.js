const Record = require('../models/record')

function getRecordsByUserAndChallengeKey(user, challengeKey) {
    return Record.find({
        "user": user,
        "challengeKey": challengeKey
    }, '_id challengeKey reps user date', {sort: {date: 1}})
}

function createRecord(body) {
    const record = new Record(body)
    return Record.create(record)
}

function deleteRecord(id) {
    return Record.deleteOne({"_id": id})
}

module.exports = {getRecordsByUserAndChallengeKey, createRecord, deleteRecord}