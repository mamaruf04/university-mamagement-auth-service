import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('🛢️ database is connected successfully!')

    app.listen(config.port, () => {
      console.log(`Applicarion is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('field to connect database.', error)
  }
}

bootstrap()
