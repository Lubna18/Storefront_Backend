// @ts-ignore
import Client from '../database'
import Product, { productDTO } from '../interfaces/product'
import ProductDto from '../interfaces/product'

export class productStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM product'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM product WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }
  
  async create(b: productDTO): Promise<Product> {
      try {
    const sql = 'INSERT INTO Product (name, price, category) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.price, b.category])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Product> {
      try {
    const sql = 'DELETE FROM product WHERE id=($1) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not delete product ${id}. Error: ${err}`)
      }
  }
}

export default productStore