import Express , { Request , Response} from "express";
import { verifyAuthToken } from "../helper/auth.middleware";
import { order , iOrder} from "../models/order.model";

const orders = new order()

const index = async (_req: Request , _res: Response)=>{
    const result =  await orders.index()
    _res.json(result)
}
 
const show = async (_req: Request , _res: Response)=>{
    const result =  await orders.show(+_req.params.id)
    _res.json(result)
}

const orderByUser = async (_req: Request , _res: Response)=>{
    const result =  await orders.orderByUser(+_req.params.id)
    _res.json(result)
}

const complatedOrdersByUser = async (_req: Request , _res: Response)=>{
    const result =  await orders.completedOrdersByUser(+_req.params.id)
    _res.json(result)
}

const create =async (_req:Request,_res:Response) => {
    try {
        const ordered: iOrder = {
            user_id: _req.body.user_id,
            status: _req.body.status,
            orderProduct: _req.body.orderProduct
        }
        const result = await orders.create(ordered)
        _res.json(result)
    } catch(err) {
        _res.status(400)
        _res.json(err)
    }
}

const update =async (_req:Request,_res:Response) => {
    try {
        const ordered: iOrder = {
            id: +_req.params.id,
            user_id: _req.body.user_id,
            status: _req.body.status,
            orderProduct: _req.body.orderProduct
        }
        const result = await orders.update(ordered)
        _res.json(result)
    } catch(err) {
        _res.status(400)
        _res.json(err)
    }
}

const deleted = async (_req: Request , _res: Response)=>{
    const result =  await orders.delete(+_req.params.id)
    _res.json(result)
}

 

export const orderRoute = (app:Express.Application)=>{
    app.get('/order',verifyAuthToken, index)
    app.get('/order/:id',verifyAuthToken, show)
    app.get('/orderByUser/:id',verifyAuthToken, orderByUser)
    app.get('/complatedOrdersByUser/:id',verifyAuthToken, complatedOrdersByUser)
    app.post('/order',verifyAuthToken, create)
    app.put('/order/:id',verifyAuthToken, update)
    app.delete('/order/:id',verifyAuthToken, deleted)

}     