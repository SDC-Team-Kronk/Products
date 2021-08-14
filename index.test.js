const axios = require('axios');
jest.setTimeout(15000);

test('products Route returns timely', async () => {
  const start = Date.now();
  const result = await axios('http://localhost:3030/products');
  const time = Date.now() - start;
  console.log('Product time: ', time / 1000, ' seconds');
  expect(time).toBeLessThan(2000);
});

test('Product information route returns timely', async () => {
  const start = Date.now();
  const result = await axios('http://localhost:3030/products/20');
  const time = Date.now() - start;
  console.log('Product Info time: ', time / 1000, ' seconds');
  expect(time).toBeLessThan(2000);
});

test('Style information route returns timely', async () => {
  const start = Date.now();
  const result = await axios('http://localhost:3030/products/20/styles');
  const time = Date.now() - start;
  console.log('style time: ', time / 1000, ' seconds');
  expect(time).toBeLessThan(2000);
});

test('Related information route returns timely', async () => {
  const start = Date.now();
  const result = await axios('http://localhost:3030/products/20/related');
  const time = Date.now() - start;
  console.log('related time: ', time / 1000, ' seconds');
  expect(time).toBeLessThan(2000);
});