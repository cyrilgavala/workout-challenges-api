const {createLogger, format, transports, config} = require('winston')
const {combine, timestamp, printf} = format

const myFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`
});

const options = {
    level: 'info',
    handleExceptions: true,
    format: combine(timestamp(), myFormat),
    colorize: true
}

const logger = createLogger({
    levels: config.npm.levels,
    transports: [
        new transports.Console(options)
    ],
    exitOnError: false
})

module.exports = logger