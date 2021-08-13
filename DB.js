const pg = require('pg');

const pgClient = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 'password',
  database: 'productservice'
});
pgClient.connect();

const getProducts = ([page, count], cb) => {
  //  not using page yet may need to index products table,
  //  its unclear when the API uses this list of information It may be unnecesary
  const request = {
    text: 'SELECT * from products limit $1',
    values: [count],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result);
  });
};

const getProductInfo = (product, cb) => {
  const request = {
    text: 'SELECT * FROM products WHERE id = $1', //  need to include feature data here via a join
    values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result);
  });
};

const getStyleInfo = (product, cb) => {
  const request = {
    text: 'SELECT * FROM style WHERE product_id = $1', //  need to include photo data here via a join
    values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result);
  });
};

const getRelated = (product, cb) => {
  const request = {
    text: 'SELECT * FROM related_products WHERE product_id = $1',
    values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result);
  });
};

module.exports = {
  getProducts,
  getProductInfo,
  getStyleInfo,
  getRelated,
};
