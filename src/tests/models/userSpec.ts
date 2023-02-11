import { user, userDTO } from '../../interfaces/user';
import userStore from '../../models/userStore';

const store = new userStore()

describe("User Model", () => {
  const userDto: userDTO = {
    firstName: "Lubna",
    lastName: "Helaly",
    password: "password"
 }

 const user: user = {
    id: 1,
    firstName: "Lubna",
    lastName: "Helaly",
    password: "password"
 }
 const user_arr: user[ ] = [user]

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create(userDto);
    expect(result).toEqual(user);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual(user_arr);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual(user);
  });

  it('delete method should remove the user', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual(user_arr);
  });
});