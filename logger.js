const {createLogger, format, transports, config} = require('winston')
const {combine, timestamp, printf} = format

const myFormat = loggerName => printf(({level, message, timestamp}) => {
    return `${timestamp} ${level.toUpperCase()} ${loggerName}: ${message}`
});

const logger = loggerName => {
    const options = {
        level: 'info',
        handleExceptions: true,
        format: combine(timestamp(), myFormat(loggerName)),
        colorize: true
    }
    return createLogger({
        levels: config.npm.levels,
        transports: [
            new transports.Console(options)
        ],
        exitOnError: false
    })
}

module.exports = function (loggerName) {
    return logger(loggerName)
}