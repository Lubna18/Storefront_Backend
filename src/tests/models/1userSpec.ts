import { user, userDTO } from '../../interfaces/user';
import userStore from '../../models/userStore';

const store = new userStore()

describe("User Model", () => {
  const userDto: userDTO = {
    firstName: "Lubna",
    lastName: "Helaly",
    password: "password"
 }

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
    await store.create(userDto);
    const result = await store.create(userDto); //create two users
    expect(result).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toHaveSize(2);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("2");
    expect(result).toBeDefined();
  });

  it('delete method should remove the user', async () => {
    await store.delete("1");
    const result = await store.index()
    expect(result).toHaveSize(1);
  });
});