import { orders, orderDTO } from '../../interfaces/orders';
import orderStore from '../../models/ordersStore';

const store = new orderStore()

describe("Orders Model", () => {
  const ordersDto: orderDTO = {
    productId: 1,
    quantity: 2,
    userId : 2,
    status: "active"
 }

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a orders', async () => {
    const result = await store.create(ordersDto);
    expect(result).toBeDefined
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

});