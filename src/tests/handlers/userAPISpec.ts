import supertest from 'supertest';
import userStore from '../../models/userStore';
import app from '../../server';
import  user  from '../../interfaces/user';

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;


describe('Test User Endpoints response ', () => {
   
    const user: user = {
        id: 1,
        firstName: "Lubna",
        lastName: "Helaly",
        password: "password"
    }

    beforeAll(() => {
        spyOn(userStore.prototype, 'index').and.returnValue(Promise.resolve([user]));
        spyOn(userStore.prototype, 'show').and.returnValue(Promise.resolve(user)); 
        spyOn(userStore.prototype, 'create').and.returnValue(Promise.resolve(user));
        spyOn(userStore.prototype, 'delete').and.returnValue(Promise.resolve(user));
        spyOn(userStore.prototype, 'authenticate').and.returnValues(Promise.resolve(user));
    });

  it('index', async () => {
    const response = await request.get('/users').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([user]);
  });
  
  it('show', async () => {
    const response = await request.get('/user/1').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it('create', async () => {
    const response = await request.post('/user')
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('delete', async () => {
    const response = await request.delete('/user/1').set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it('login', async () => {
    const response = await request.post('/login')
    expect(response.status).toBe(200);
  });

});
