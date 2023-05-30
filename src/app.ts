import cors from 'cors'
import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('working successfully!')
})

export default app
