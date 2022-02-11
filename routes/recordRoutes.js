const express = require('express')
const router = express.Router()
const recordService = require("../service/recordService")
const logger = require("../logger")("recordRoutes")

router.use(require("../middleware/validators/recordRequestValidator"))

router.get('/', async (req, res) => {
    logger.info('Received GET request')
    recordService.getRecordsByUserAndChallengeKey(req.query.user, req.query.challengeKey).then(result => res.status(200).send(result))
})

router.put('/', async (req, res) => {
    logger.info('Received PUT request')
    recordService.createRecord(req.body).then(result => res.status(200).send(result))
})

router.delete('/', async (req, res) => {
    logger.info('Received DELETE request')
    recordService.deleteRecord(req.query.id).then(() => res.status(200).send())
})

module.exports = router