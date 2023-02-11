import express, { Request, Response } from 'express'
import productStore from '../models/productStore';
import { product, productDTO } from '../interfaces/product';
import  verifyAuthToken from '../middleware/auth';

const store = new productStore();

const productRoutes = (app: express.Application) =>{
   app.get('/products', index),
   app.get('/product/:id', show), 
   app.post('/product', verifyAuthToken, create), 
   app.delete('/product/:id',deleteEntity)
}

const index = async (_req: Request, res: Response) => {
   try {
      const products = await store.index()
      res.json(products)
   } catch (err) {
      res.status(400)
      res.json(err)
      console.log(err)
   }
 }

const show = async (_req: Request, res:Response) => {
   try {
      const productId: string = _req.params.id
      const user = await store.show(productId)
      res.json(user)
   } catch (err) {
      res.status(400)
      res.json(err)
      console.log(err)
   }
}

const create = async (req: Request, res:Response) =>{

    const product: productDTO = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
   }
  try {
      const updated = await store.create(product)
      res.json(updated)
  } catch(err) {
      res.status(400)
      res.json(err)
      console.log(err)
  }
}

const deleteEntity = async (req: Request, res: Response) =>{
   try{
      const productid : string = req.params.id
      const result = await store.delete(productid)
      res.json(result)
   }catch(err){
      res.json(err)
      console.log(err)
   }

}

export default productRoutes