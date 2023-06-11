import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🛢️ database is connected successfully!')

    app.listen(config.port, () => {
      logger.info(`Applicarion is listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('field to connect database.', error)
  }
}

bootstrap()
