import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dashboardRoutes from './handlers/dashboard'
import orderRoutes from './handlers/ordersAPI'
import productRoutes from './handlers/productAPI'
import userRoutes from './handlers/userAPI'

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())

dashboardRoutes(app)
orderRoutes(app)
productRoutes(app)
userRoutes(app)

const corsOptions = {
    origin: "http://someotherdomain.com",
    optionsSucessStatus : 200
}

app.use(cors(corsOptions))

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;