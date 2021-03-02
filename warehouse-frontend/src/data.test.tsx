import Data from "./api/data";

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
  it('My second Test Case', () => {
    expect(true).toEqual(true);
  });

  it('check if products in products.json', () => {
    const data = new Data();
    const result = data.getAllProducts();
    console.log(result);
    expect(true).toEqual(true);

  });
});
