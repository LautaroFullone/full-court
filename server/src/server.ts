import { clientsRouter, productsRouter, reservationsRouter } from './routes'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3030
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/reservations', reservationsRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, () => {
   console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
