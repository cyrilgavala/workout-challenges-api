const logger = require("../logger")("serviceUtils")

function handleError(statusCode, message, err) {
    logger.error(message + err)
    return {status: statusCode, error: message + err}
}

module.exports = {handleError}