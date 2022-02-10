const {validateBody, validateParameter} = require("../../utils/validatorUtils")

module.exports = (req, res, next) => {
    let errors = []
    if (req.method === 'GET') {
        errors.push(validateParameter(req.query.user, "user"))
        errors.push(validateParameter(req.query.challengeKey, "challengeKey"))
    } else if (req.method === 'PUT') {
        errors.push(validateBody(req.body))
        errors.push(validateParameter(req.body.challengeKey, "challengeKey"))
        errors.push(validateParameter(req.body.reps, "reps"))
        errors.push(validateParameter(req.body.user, "user"))
        errors.push(validateParameter(req.body.date, "date"))
    } else if (req.method === 'DELETE') {
        errors.push(validateParameter(req.query.id, "id"))
    }
    errors = errors.filter(val => val != null)
    if (errors.length === 0) {
        next()
    } else {
        res.status(400).send({errors: errors})
    }
}