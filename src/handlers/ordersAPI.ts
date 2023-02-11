import express, {Request, Response } from 'express'
import { orderDTO} from '../interfaces/orders'
import OrdersStore from '../models/ordersStore'
import  verifyAuthToken from '../middleware/auth';

const store = new OrdersStore()

const orderRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, create),
    app.get('/orders', verifyAuthToken, index), 
    // add product
    app.post('/orders/:id/products',verifyAuthToken, addProduct),
    app.get('/orders/:id', verifyAuthToken, ordersByUser)
}

const index = async (_req: Request, res: Response) => {
    try {
       const orders = await store.index()
       res.json(orders)
    } catch (err) {
       res.status(400)
       res.json(err)
       console.log(err)
    }
  }

const create = async (req: Request, res:Response) =>{
    const orderdto: orderDTO = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      userId: req.body.userId,
      status: req.body.status
   }
  try {
      const order = await store.create(orderdto)
      res.json(order)
  } catch(err) {
      res.status(400)
      res.json(err)
      console.log(err)
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedOrderProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedOrderProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
    console.log(err)
  }
} 

const ordersByUser = async(_req : Request, res : Response) =>{
    const userId : Number = parseInt(_req.params.id)
    try{
        const orders = await store.findOrderByUser(userId)
        res.json(orders)
    }catch(err){
        res.status(400)
        res.json(err)
        console.log(err)
    }
}

export default orderRoutes