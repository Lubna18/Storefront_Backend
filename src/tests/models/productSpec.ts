import { product, productDTO } from '../../interfaces/product';
import productStore from '../../models/productStore';

const store = new productStore()

describe("Product Model", () => {
  const productDto : productDTO = {
    name: "product1",
    price: 2,
    category: "A"
 }

 const product : product = {
    id: 1,
    name: "product1",
    price: 2,
    category: "A"
 }
 const product_arr: product[ ] = [product]

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

  it('create method should add a product', async () => {
    await store.create(productDto);
    const result = await store.create(productDto);
    expect(result).toBeDefined();

  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toBeDefined();
  });

  it('delete method should remove the product', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toHaveSize(1);
  });
});