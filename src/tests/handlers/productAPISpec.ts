import supertest from 'supertest';
import app from '../../server';
import  product  from '../../interfaces/product';
import productStore from '../../models/productStore';

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;

describe('Test Product Endpoints response ', () => {
    
    const product : product = {
        id: 1,
        name: "product1",
        price: 2,
        category: "A"
    } 

    beforeAll(() => {
        spyOn(productStore.prototype, 'index').and.returnValue(Promise.resolve([product]));
        spyOn(productStore.prototype, 'show').and.returnValue(Promise.resolve(product)); 
        spyOn(productStore.prototype, 'create').and.returnValue(Promise.resolve(product));
        spyOn(productStore.prototype, 'delete').and.returnValue(Promise.resolve(product));
    });

  it('index', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });
  
  it('show', async () => {
    const response = await request.get('/product/1')
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });

  it('create', async () => {
    const response = await request.post('/product').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });

  it('delete', async () => {
    const response = await request.delete('/product/1').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });

});
