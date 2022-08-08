import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { productRoute } from './handler/products.handler'
import { orderRoute } from './handler/order.handler'
import { categoryRoute } from './handler/category.handler'
import { userRoute } from './handler/user.handler'
import { orderProductRoute } from './handler/orders_product.handler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoute(app)
orderRoute(app)
categoryRoute(app)
userRoute(app)
orderProductRoute(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
