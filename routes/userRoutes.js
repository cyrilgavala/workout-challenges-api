const express = require('express')
const router = express.Router()
const userService = require("../service/userService")
const logger = require("../logger")("userRoutes")

router.use(require('../middleware/validators/userRequestValidator'))

const handleResult = (result, res) => {
    if (result !== undefined) {
        if (result.name) {
            res.status(200).send({name: result.name})
        } else if (result.status && result.error) {
            res.status(result.status).send({error: result.error})
        }
    }
}

router.put('/register', async (req, res) => {
    logger.info('Received registration request')
    userService.registerUser(req.body).then(result => handleResult(result, res))
})

router.post('/login', async (req, res) => {
    logger.info('Received login request')
    userService.loginUser(req.body.name, req.body.pass).then(result => handleResult(result, res))
})

module.exports = router