import supertest from 'supertest';
 import app from '../../server';
 import orders from '../../interfaces/orders';
import OrdersStore from '../../models/ordersStore';

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;


describe('Test Orders Endpoints response ', () => {
    
    const orders : orders = {
        id: 1,
        productId: 1,
        quantity: 2,
        userId : 2,
        status: "active"
    } 

    beforeAll(() => {
        spyOn(OrdersStore.prototype, 'index').and.returnValue(Promise.resolve([orders]));
        spyOn(OrdersStore.prototype, 'create').and.returnValue(Promise.resolve(orders));
        spyOn(OrdersStore.prototype, 'addProduct').and.returnValue(Promise.resolve(orders)); 
        spyOn(OrdersStore.prototype, 'findOrderByUser').and.returnValue(Promise.resolve([orders]));
    });

  it('index', async () => {
    const response = await request.get('/orders').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([orders]);
  });

  it('create', async () => {
    const response = await request.post('/orders').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(orders);
  });

  it('addProduct', async () => {
    const response = await request.post('/orders/:id/products').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(orders);
  });

  it('ordersByUser', async () => {
    const response = await request.get('/orders/:id').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([orders]);
  });

});
