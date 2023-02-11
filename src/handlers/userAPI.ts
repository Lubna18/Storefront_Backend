import express, { Request, Response } from 'express'

import userStore from '../models/userStore';
import { user, userDTO } from '../interfaces/user';
import  verifyAuthToken from '../middleware/auth';
import jwt from 'jsonwebtoken';

const store = new userStore();

const userRoutes = (app: express.Application) =>{
   app.get('/users', verifyAuthToken, index),
   app.get('/user/:id', verifyAuthToken, show), 
   app.post('/user', verifyAuthToken, create), 
   app.delete('/user/:id',deleteEntity),
   app.post('/firstuser', firstCreate)
}

const index = async (_req: Request, res: Response) => {
   try {
      const users = await store.index()
      res.json(users)
   } catch (err) {
      res.status(400)
      res.json(err)
      console.log(err)
   }
 }

const show = async (_req: Request, res:Response) => {
   try {
      const userId: string = _req.params.id
      const user = await store.show(userId)
      res.json(user)
   } catch (err) {
      res.status(400)
      res.json(err)
      console.log(err)
   }
}

const create = async (req: Request, res:Response) =>{
    const userDto: userDTO = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
   }
  try {
      const user = await store.create(userDto)
      res.json(user)
  } catch(err) {
      res.status(400)
      res.json(err)
      console.log(err)
  }
}

const deleteEntity = async (req: Request, res: Response) =>{
   try{
      const userId: string = req.params.id
      const result = await store.delete(userId)
      res.json(result)
   }catch(err){
      res.status(400)
      res.json(err)
      console.log(err)
   }

}

const firstCreate = async (req: Request, res: Response) => {
   const userDto: userDTO = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
   }
   try {
       const newUser = await store.create(userDto)
       var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
       res.json(token)
   } catch(err) {
       res.status(400)
       res.json(err)
       console.log(err)
   }
}

export default userRoutes