const db = require('./DB');

test('Get products returns proper structure', (done) => {
  const start = Date.now();
  db.getProducts([1, 2], (err, result) => {
    if (err) {
      return done(err);
    } else if (result) {
      console.log('Product time: ', Date.now() - start);
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        slogan: expect.any(String),
        description: expect.any(String),
        category: expect.any(String),
        default_price: expect.any(String),
      })]));
      done();
    }
  });

  db.getProducts([1, 2], (err, result) => {
    if (err) return err;
    if (result) {
      expect(result.length).toBe(2);
    }
  });
});

test('Get product information returns proper structure', (done) => {
  const start = Date.now();
  db.getProductInfo(24528, (err, result) => {
    if (err) done(err);
    if (result) {
      console.log('Product Info time: ', Date.now() - start);
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        slogan: expect.any(String),
        description: expect.any(String),
        category: expect.any(String),
        default_price: expect.any(String),
        features: expect.arrayContaining([expect.objectContaining({
          feature: expect.any(String),
          value: expect.any(String),
        })]),
      }));
    }
    done();
  });
});

test('Get style information returns proper structure', (done) => {
  const start = Date.now();
  db.getStyleInfo(24528, (err, result) => {
    if (err) done(err);
    if (result) {
      console.log('Style Info time: ', Date.now() - start);
      expect(result).toEqual(expect.objectContaining({
        //  product_id: expect.any(String),
        results: expect.arrayContaining([expect.objectContaining({
          style_id: expect.any(Number),
          name: expect.any(String),
          original_price: expect.any(String),
          sale_price: expect.any(String),
          //'default?': expect.any(String),
          photos: expect.arrayContaining([expect.objectContaining({
            thumbnail_url: expect.any(String),
            url: expect.any(String),
          })]),
          skus: expect.objectContaining({
            //expect.any(String): expect.objectContaining({
            //quantity: expect.any(Number),
            //size: expect.any(String),})
          }),
        })]),
      }));
    }
    done();
  });
});

test('Get related information returns proper structure', (done) => {
  const start = Date.now();
  db.getRelated(24528, (err, result) => {
    if (err) done(err);
    if (result) {
      console.log('Related Info time: ', Date.now() - start);
      expect(result).toEqual(expect.arrayContaining([expect.any(Number)]));
    }
    done();
  });
});