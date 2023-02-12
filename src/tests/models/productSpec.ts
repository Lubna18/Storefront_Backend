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
    const result = await store.create(productDto);
    expect(result.name).toEqual(product.name);
    expect(result.price).toEqual(product.price);
    expect(result.category).toEqual(product.category);

  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result[0].name).toEqual(product.name);
    expect(result[0].price).toEqual(product.price);
    expect(result[0].category).toEqual(product.category);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual(product);
  });

  it('delete method should remove the product', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual(product_arr);
  });
});