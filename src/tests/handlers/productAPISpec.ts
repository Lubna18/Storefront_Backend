import supertest from 'supertest';
import app from '../../server';
import { product, productDTO } from '../../interfaces/product';
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
        const store = new productStore();
        spyOn(store, 'index').and.returnValue(Promise.resolve([product]));
        spyOn(store, 'show').and.returnValue(Promise.resolve(product)); 
        spyOn(store, 'create').and.returnValue(Promise.resolve(product));

    });

  it('index', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200);
    //expect(response.body).toEqual([product]);
  });
  
  it('show', async () => {
    const response = await request.get('/product/1')
    expect(response.status).toBe(200);
    //expect(response.body).toEqual(product);
  });

  it('create', async () => {
    const response = await request.post('/product').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    //expect(response.body).toEqual(product);
  });
});
