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
    text: `SELECT products.id, product_name as name, slogan, product_description as description, category, default_price, jsonb_agg(json_build_object('feature', features.feature, 'value', features.feature_value)) as features FROM products full join features on products.id = features.product_id WHERE products.id = $1 group by products.id;`, //  need to include feature data here via a join
    values: [product],
  };
  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    return cb(null, result.rows);
  });
};

const getStyleInfo = (product, cb) => {
  const request = {
    text: `select style.id as style_id, style_name as name, original_price, sale_price, isdefault, jsonb_agg(json_build_object('photo_url',photos.photo_url, 'thumbnail_url', photos.thumbnail_url)) as photos, jsonb_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as skus from style full join photos on photos.style_id = style.id full join skus on skus.style_id = style.id where style.id = $1 group by
    style.id;`,
    values: [product],
  };

  pgClient.query(request, (err, result) => {
    if (err) {
      return cb(err, null);
    }
    //  console.log(result.rows[0]);
    const data = {};
    data.results = result.rows;
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
