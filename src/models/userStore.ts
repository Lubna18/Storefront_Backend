// @ts-ignore
import Client from '../database'
import User, { userDTO } from '../interfaces/user'
import UserDto from '../interfaces/user'

export class userStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM shop_user'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM shop_user WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find shop_user ${id}. Error: ${err}`)
    }
  }
  
  async create(b: userDTO): Promise<User> {
      try {
    const sql = 'INSERT INTO shop_user (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()
    const result = await conn.query(sql, [b.firstName, b.lastName, b.password])
    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${b.firstName}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM shop_user WHERE id=($1) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])
    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
  
}

export default userStore