const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const logger = require("../logger")

router.use(require("../middleware/validators/recordRequestValidator"))

router.get('/', async (req, res) => {
    logger.info('Received GET request')
    Record.find({
        "user": req.query.user,
        "challengeKey": req.query.challengeKey
    }, '_id challengeKey reps user date', {sort: {date: 1}}, (err, data) => {
        if (err) res.status(500).send(err)
        else {
            if (data === null || data === undefined) {
                logger.debug("No records found")
                res.status(200).send([])
            } else {
                logger.debug("Records found")
                res.status(200).send(data)
            }
        }
    })
})

router.put('/', async (req, res) => {
    logger.info('Received PUT request')
    const record = new Record(req.body)
    Record.create(record).then(r => {
        logger.debug("Record saved")
        res.status(200).send(r)
    }).catch(err => {
        logger.error("Saving record failed " + err)
        res.status(500).send({error: "Saving failed"})
    })
})

router.delete('/', async (req, res) => {
    logger.info('Received DELETE request', req.query?.id)
    Record.deleteOne({
        "_id": req.query.id
    }).then(() => {
        logger.debug("Record deleted")
        res.status(200).send()
    }).catch(err => {
        logger.error("Deleting record failed" + err)
        res.status(500).send({error: "Deletion failed"})
    })
})

module.exports = router