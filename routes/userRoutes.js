const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.use(require('../middleware/validators/userRequestValidator'))

router.put('/register', async (req, res) => {
    console.log('%s INFO Received %s request for registration %s', new Date().toISOString(), req.method, req.body)
    User.findOne({"name": req.body.name}, 'name', (err, data) => {
        if (err) res.status(500).send(err);
        else {
            if (data === null || data === undefined) {
                const user = new User(req.body);
                User.create(user).then(r => {
                    console.log("%s INFO User registered %s", new Date().toISOString(), r);
                    res.status(200).send({name: user.name});
                }).catch(err => {
                    console.error("%s ERROR %s", new Date().toISOString(), err);
                    res.status(500).send({error: "Registration failed"})
                });
            } else {
                console.error("%s ERROR User already exists", new Date().toISOString());
                res.status(409).send({error: "User already exists"})
            }
        }
    });
})

router.post('/login', async (req, res) => {
    console.log('%s INFO Received %s request for login %s', new Date().toISOString(), req.method, req.body)
    User.findOne({"name": req.body.name}, 'name pass', (err, data) => {
        if (err) res.status(500).send(err);
        else {
            if (data === null || data === undefined) {
                console.error("%s ERROR User not registered", new Date().toISOString());
                res.status(500).send({error: "User not registered"})
            } else if (data.pass !== req.body.pass) {
                console.error("%s ERROR Wrong password", new Date().toISOString());
                res.status(409).send({error: "Wrong password"})
            } else {
                console.log("%s INFO User authenticated", new Date().toISOString())
                res.status(200).send({name: data.name})
            }
        }
    });
})

module.exports = router;