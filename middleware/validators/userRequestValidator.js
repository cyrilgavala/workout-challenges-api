const {validateBody, validateParameter} = require("../../utils/validatorUtils")

module.exports = (req, res, next) => {
    let errors = []
    if (req.method === 'PUT' || req.method === 'POST') {
        errors.push(validateBody(req.body))
        errors.push(validateParameter(req.body.name, "name"))
        errors.push(validateParameter(req.body.pass, "pass"))
    }
    errors = errors.filter(val => val != null)
    if (errors.length === 0) {
        next()
    } else {
        res.status(400).send({errors: errors})
    }
}