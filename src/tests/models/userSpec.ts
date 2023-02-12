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
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create(userDto);
    console.log(result)
    expect(result.firstName).toEqual(user.firstName);
    expect(result.lastName).toEqual(user.lastName);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
    expect(result[0].firstName).toEqual(user.firstName);
    expect(result[0].lastName).toEqual(user.lastName);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toBeDefined();
  });

  it('delete method should remove the user', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toBeDefined();
  });
});