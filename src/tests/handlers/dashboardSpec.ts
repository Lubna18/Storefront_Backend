import supertest from 'supertest';
import app from '../../server';
import DashboardQueries from '../../services/dashboard';

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;


describe('Test Dashboard Endpoints response ', () => {
    

    beforeAll(() => {
        spyOn(DashboardQueries.prototype, 'productsInOrders').and.returnValue(Promise.resolve([
            {
                "name": "product1",
                "price": 77,
                "order_id": "1"
            },
            {
                "name": "product3",
                "price": 33,
                "order_id": "1"
            }
        ]));
        
        spyOn(DashboardQueries.prototype, 'fiveMostExpensive').and.returnValue(Promise.resolve([
            {
                "name": "product6",
                "price": 700
            },
            {
                "name": "product8",
                "price": 64
            },
            {
                "name": "product3",
                "price": 33
            }
        ])); 
    });

  it('productsInOrders', async () => {
    const response = await request.get('/products_in_orders')
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
        {
            "name": "product1",
            "price": 77,
            "order_id": "1"
        },
        {
            "name": "product3",
            "price": 33,
            "order_id": "1"
        }
    ]);
  });

  it('usersWithOrders', async () => {
    const response = await request.get('/users-with-orders')
    expect(response.status).toBe(200);
  });

  it('fiveMostExpensive', async () => {
    const response = await request.get('/five-most-expensive')
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
        {
            "name": "product6",
            "price": 700
        },
        {
            "name": "product8",
            "price": 64
        },
        {
            "name": "product3",
            "price": 33
        }
    ]);
  });

});
