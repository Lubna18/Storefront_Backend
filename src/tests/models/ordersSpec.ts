import { orders, orderDTO } from '../../interfaces/orders';
import orderStore from '../../models/ordersStore';

const store = new orderStore()

describe("Orders Model", () => {
  const ordersDto: orderDTO = {
    productId: 1,
    quantity: 2,
    userId : 1,
    status: "active"
 }

 const orders: orders = {
    id: 1,
    productId: 1,
    quantity: 2,
    userId : 1,
    status: "active"
 }
 const orders_arr: orders[ ] = [orders]

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a orders', async () => {
    const result = await store.create(ordersDto);
    expect(result).toEqual(orders);
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual(orders_arr);
  });

});