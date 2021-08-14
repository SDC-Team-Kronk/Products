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
  // const start = date.now();
  // console.log('the start is ', start);
  const request = {
    text: 'SELECT products.id, product_name as name, slogan, product_description as description, category, default_price from products limit $1',
    values: [count],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result.rows);
  });
};

const getProductInfo = (product, cb) => {
  const request = {
    text: `SELECT products.id, product_name as name, slogan, product_description as description, category, default_price, jsonb_agg(jsonb_build_object('feature', features.feature, 'value', features.feature_value)) as features FROM products full join features on products.id = features.product_id WHERE products.id = $1 group by products.id;`, //  need to include feature data here via a join
    values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result.rows[0]);
  });
};

const getStyleInfo = (product, cb) => {
  const request = {
    text: `SELECT style.id as style_id, style_name as name, original_price, sale_price, isdefault, jsonb_agg(jsonb_build_object('photo_url',photos.photo_url, 'thumbnail_url', photos.thumbnail_url)) as photos, jsonb_object_agg(skus.id, jsonb_build_object('quantity', skus.quantity, 'size', skus.size)) as skus FROM style FULL JOIN photos ON photos.style_id = style.id FULL JOIN skus ON skus.style_id = style.id WHERE style.id = $1 GROUP BY style.id;`,
    values: [product],
  };

  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    const data = {};
    data.results = result.rows;
    data.product_id = product.toString();
    return cb(null, data);
  });
};

const getRelated = (product, cb) => {
  const request = {
    text: `SELECT jsonb_agg(related_id) as related FROM related_products WHERE product_id = 1 group by product_id`,
    // values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result.rows[0].related);
  });
};

module.exports = {
  getProducts,
  getProductInfo,
  getStyleInfo,
  getRelated,
};
