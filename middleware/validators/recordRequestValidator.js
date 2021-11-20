const utils = require('middleware/validators/validatorUtils').ValidatorUtils;

const validateBodyForPut = (req, res) => {
    utils.missingBody(req, res)
    if (utils.invalidBodyParam(req.body.challengeKey) || utils.invalidBodyParam(req.body.reps) || utils.invalidBodyParam(req.body.user) || utils.invalidBodyParam(req.body.date)) {
        console.error("%s ERROR Missing parameter in request req.body.", new Date().toISOString());
        res.status(400).send({error: "Missing parameter in request req.body"});
    }
}

const validateBodyForDelete = (req, res) => {
    utils.missingBody(req, res)
    if (utils.invalidBodyParam(req.body.challengeKey) || utils.invalidBodyParam(req.body.user) || utils.invalidBodyParam(req.body.date)) {
        console.error("%s ERROR Missing parameter in request req.body.", new Date().toISOString());
        res.status(400).send({error: "Missing parameter in request req.body"});
    }
}

const validateQueryParamsForGet = (req, res) => {
    if (req.query.user === undefined) {
        console.error("%s ERROR Missing user parameter", new Date().toISOString());
        res.status(400).send({error: "Missing user parameter"});
    } else if (req.query.challengeKey === undefined) {
        console.error("%s ERROR Missing challengeKey parameter", new Date().toISOString());
        res.status(400).send({error: "Missing challengeKey parameter"});
    }
}

module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        validateQueryParamsForGet(req, res)
    } else if (req.method === 'PUT') {
        validateBodyForPut(req, res)
    } else if (req.method === 'DELETE') {
        validateBodyForDelete(req, res)
    } else {
        next()
    }
}