import { product, productDTO } from '../../interfaces/product';
import productStore from '../../models/productStore';

const store = new productStore()

describe("Product Model", () => {
  const productDto : productDTO = {
    name: "product1",
    price: 2,
    category: "A"
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

  it('create method should add a product', async () => {
    await store.create(productDto);
    const result = await store.create(productDto);
    expect(result).toBeDefined();

  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result[0].name).toEqual(productDto.name)
    expect(result).toHaveSize(2);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("2");
    expect(result).toBeDefined();
  });

  it('delete method should remove the product', async () => {
    await store.delete("1");
    const result = await store.index()

    expect(result).toHaveSize(1);
  });


});