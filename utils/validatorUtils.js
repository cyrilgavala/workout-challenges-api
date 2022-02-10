const logger = require("../logger")

const validateParameter = (paramValue, paramLabel) => {
    if (paramValue === null || paramValue === undefined) {
        logger.error("Invalid parameter " + paramLabel)
        return "Missing parameter " + paramLabel
    }
}

const validateBody = (body) => {
    if (body === undefined || Object.keys(body).length === 0) {
        logger.error("Missing request body")
        return "Missing request body"
    }
}

module.exports = {validateParameter, validateBody}