const express = require('express')
const router = express.Router()
const userService = require("../service/userService")
const logger = require("../logger")("userRoutes")
const jwt = require("jsonwebtoken")

router.use(require('../middleware/validators/userRequestValidator'))

const handleResult = (result, res) => {
    if (result !== undefined) {
        if (result.name) {
            const accessToken = jwt.sign(result.name, process.env.TOKEN_SECRET)
            res.status(200).send({name: result.name, accessToken: accessToken})
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