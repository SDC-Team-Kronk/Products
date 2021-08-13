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

DROP TABLE IF EXISTS  features;
CREATE TABLE features
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  feature VARCHAR,
  feature_value VARCHAR
);
\copy features FROM '/Users/portiajones/Downloads/features.csv' CSV HEADER;

DROP TABLE IF EXISTS  related_products;
CREATE TABLE related_products
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  related_id INTEGER
);
\copy related_products FROM '/Users/portiajones/Downloads/related.csv' CSV HEADER;

DROP TABLE IF EXISTS  style;
CREATE TABLE style
(
	id INTEGER PRIMARY KEY,
  product_id INTEGER references products(id),
  style_name VARCHAR,
  original_price numeric,
  sale_price numeric,
  isDefault BOOLEAN
);
\copy style FROM '/Users/portiajones/Downloads/styles.csv' NULL 'null' CSV HEADER;

DROP TABLE IF EXISTS  skus;
CREATE TABLE skus
(
	id INTEGER PRIMARY KEY,
  style_id INTEGER references style(id),
  size VARCHAR,
  quantity INTEGER
);
\copy skus FROM '/Users/portiajones/Downloads/skus.csv' CSV HEADER;

DROP TABLE IF EXISTS  photos;
CREATE TABLE photos
(
	id INTEGER PRIMARY KEY,
  style_id INTEGER references style(id),
  photo_url VARCHAR,
  thumbnail_url VARCHAR
);
\copy photos FROM '/Users/portiajones/Downloads/newphotos1.csv'  CSV HEADER;
\copy photos FROM '/Users/portiajones/Downloads/newphotos2.csv'  CSV HEADER;
\copy photos FROM '/Users/portiajones/Downloads/newphotos3.csv'  CSV HEADER;
\copy photos FROM '/Users/portiajones/Downloads/newphotos4.csv'  CSV HEADER;
\copy photos FROM '/Users/portiajones/Downloads/newphotos5.csv'  CSV HEADER;
\copy photos FROM '/Users/portiajones/Downloads/newphotos6.csv'  CSV HEADER;
