const {missingBody, invalidBodyParam} = require("./validatorUtils");

module.exports = (req, res, next) => {
    if (req.method === 'PUT' || req.method === 'POST') {
        missingBody(req, res)
        if (invalidBodyParam(req.body.name) || invalidBodyParam(req.body.pass)) {
            console.error("%s ERROR Missing name or password in request body.", new Date().toISOString());
            res.status(400).send({error: "Missing parameter name or pass in request body"});
        }
    } else {
        next()
    }
}