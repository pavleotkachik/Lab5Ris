import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.splat(),
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message, label, timestamp }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console()
  ]
})

export default logger