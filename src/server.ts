import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🛢️ database is connected successfully!')

    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('field to connect database.', error)
  }

  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    errorlogger.error(
      '🖲️ Unhandled rejection is detected. We are closing our server.............'
    )
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    }
    process.exit(1)
  })
}
bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received!')
  if (server) {
    server.close()
  }
})
