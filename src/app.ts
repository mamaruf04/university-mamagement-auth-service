import cors from 'cors'
import express, { Application, Request } from 'express'

const app: Application = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: any) => {
  res.send('working successfully!')
})

export default app
