const express = require('express')
const router = express.Router()
const User = require('../models/user')
const logger = require("../logger")

router.use(require('../middleware/validators/userRequestValidator'))

router.put('/register', async (req, res) => {
    logger.info('Received registration request')
    User.findOne({"name": req.body.name}, 'name', (err, data) => {
        if (err) {
            logger.error(err)
            res.status(500).send(err)
        } else {
            if (data === null || data === undefined) {
                const user = new User(req.body)
                User.create(user).then(() => {
                    logger.debug("User registered")
                    res.status(200).send({name: data.name})
                }).catch(err => {
                    logger.error("Registration failed" + err)
                    res.status(500).send({error: "Registration failed"})
                })
            } else {
                logger.error("User already exists")
                res.status(409).send({error: "User already exists"})
            }
        }
    })
})

router.post('/login', async (req, res) => {
    logger.info('Received login request')
    User.findOne({"name": req.body.name}, 'name pass', (err, data) => {
        if (err) {
            logger.error(err)
            res.status(500).send(err)
        } else {
            if (data === null || data === undefined) {
                logger.error("User not registered")
                res.status(404).send({error: "User not registered"})
            } else if (data.pass !== req.body.pass) {
                logger.error("Wrong password")
                res.status(409).send({error: "Wrong password"})
            } else {
                logger.debug("User authenticated")
                res.status(200).send({name: data.name})
            }
        }
    })
})

module.exports = router