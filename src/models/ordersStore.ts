// @ts-ignore
import Client from '../database'
import Orders, { orderDTO } from '../interfaces/orders'


export class OrdersStore {
    async index(): Promise<Orders[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM ORDERS'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create(b: orderDTO): Promise<Orders> {
        try {
      const sql = 'INSERT INTO ORDERS (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [b.productId, b.quantity, b.userId,b.status])
      const user = result.rows[0]
  
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async findOrderByUser( userId : Number) : Promise<Orders[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'Select * from orders where user_id = ($1)';

            const result = await conn.query(sql, [userId])
            conn.release()
            
            return result.rows
        }catch(err){
            console.log(err)
            throw new Error(`No orders found for user ${userId}`)
        }

    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Orders> {
        // get order to see if it is open
        try {
          const ordersql = 'SELECT * FROM orders WHERE id=($1)'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn.query(ordersql, [orderId])
    
          const order = result.rows[0]
    
          if (order.status !== "active") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
          }
    
          conn.release()
        } catch (err) {
          throw new Error(`${err}`)
        }
    
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, productId])
    
          const orderProducts = result.rows[0]
    
          conn.release()
    
          return orderProducts
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}

export default OrdersStore