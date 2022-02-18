const recordDao = require("../dao/recordDao")
const {handleError} = require("../utils/serviceUtils")

async function getRecordsByUserAndChallengeKey(user, challengeKey) {
    try {
        const data = await recordDao.getRecordsByUserAndChallengeKey(user, challengeKey)
        return data === null || data === undefined ? [] : data
    } catch (err) {
        return handleError(500, "Retrieval of data failed ", err)
    }
}

async function createRecord(body, user) {
    try {
        body.user = user
        return recordDao.createRecord(body)
    } catch (err) {
        return handleError(500, "Creation of record failed ", err)
    }
}

async function deleteRecord(id) {
    try {
        return recordDao.deleteRecord(id)
    } catch (err) {
        return handleError(500, "Deletion of record failed ", err)
    }
}

module.exports = {getRecordsByUserAndChallengeKey, createRecord, deleteRecord}