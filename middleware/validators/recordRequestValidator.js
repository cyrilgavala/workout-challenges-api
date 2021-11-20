const {missingBody, invalidBodyParam} = require("./validatorUtils");

module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        if (req.query.user === undefined) {
            console.error("%s ERROR Missing user parameter", new Date().toISOString());
            res.status(400).send({error: "Missing user parameter"});
        } else if (req.query.challengeKey === undefined) {
            console.error("%s ERROR Missing challengeKey parameter", new Date().toISOString());
            res.status(400).send({error: "Missing challengeKey parameter"});
        } else {
            next()
        }
    } else if (req.method === 'PUT') {
        missingBody(req, res)
        if (invalidBodyParam(req.body.challengeKey) || invalidBodyParam(req.body.reps) || invalidBodyParam(req.body.user) || invalidBodyParam(req.body.date)) {
            console.error("%s ERROR Missing parameter in request req.body.", new Date().toISOString());
            res.status(400).send({error: "Missing parameter in request req.body"});
        } else {
            next()
        }
    } else if (req.method === 'DELETE') {
        missingBody(req, res)
        if (invalidBodyParam(req.body.challengeKey) || invalidBodyParam(req.body.user) || invalidBodyParam(req.body.date)) {
            console.error("%s ERROR Missing parameter in request req.body.", new Date().toISOString());
            res.status(400).send({error: "Missing parameter in request req.body"});
        } else {
            next()
        }
    } else {
        next()
    }
}