DROP TABLE IF EXISTS  photos;
DROP TABLE IF EXISTS  skus;
DROP TABLE IF EXISTS  style;
DROP TABLE IF EXISTS  related_products;
DROP TABLE IF EXISTS  features;
DROP TABLE IF EXISTS  products;

CREATE TABLE products
(
	id INTEGER PRIMARY KEY,
  product_name VARCHAR,
  slogan VARCHAR,
  product_description VARCHAR,
  category VARCHAR,
  default_price numeric
);
\copy products FROM '/Users/portiajones/Downloads/product.csv' CSV HEADER;


CREATE TABLE features
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  feature VARCHAR,
  feature_value VARCHAR
);
\copy features FROM '/Users/portiajones/Downloads/features.csv' CSV HEADER;


CREATE TABLE related_products
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  related_id INTEGER
);
\copy related_products FROM '/Users/portiajones/Downloads/related.csv' CSV HEADER;


CREATE TABLE style
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  style_name VARCHAR,
  sale_price numeric,
  original_price numeric,
  isDefault BOOLEAN
);
\copy style FROM '/Users/portiajones/Downloads/styles.csv' NULL 'null' CSV HEADER;


CREATE TABLE skus
(
	id INTEGER PRIMARY KEY,
  style_id INTEGER references style(id),
  size VARCHAR,
  quantity INTEGER
);
\copy skus FROM '/Users/portiajones/Downloads/skus.csv' CSV HEADER;


CREATE TABLE photos
(
	id INTEGER PRIMARY KEY,
  style_id INTEGER references style(id),
  photo_url VARCHAR,
  thumbnail_url VARCHAR
);
\copy photos FROM '/Users/portiajones/Downloads/photos.csv'  CSV HEADER;

DECLARE RecentProducts SCROLL CURSOR FOR SELECT * FROM products;