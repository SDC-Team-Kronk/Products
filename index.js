const express = require('express');
const compression = require('compression');
const db = require('./DB');

const PORT = 3030;
const HOST = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(compression());

app.get('/products', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  db.getProducts([page, count], (err, result) => {
    if (err) {
      console.log('Error reading product list');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.sendStatus(404);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(200).send(result);
    }
  });
});

app.get('/products/:productId', (req, res) => {
  db.getProductInfo(req.params.productId, (err, result) => {
    if (err) {
      console.log('Error reading product info');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.sendStatus(404);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(200).send(result);
    }
  });
});

app.get('/products/:productId/styles', (req, res) => {
  //  do some stuff to generate the product styles
  db.getStyleInfo(req.params.productId, (err, result) => {
    if (err) {
      console.log('Error reading Style info');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.sendStatus(404);
    } else {
      //  console.log('sending stlyes');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      result.product_id = req.params.productId;
      result.results.forEach((styleObj) => {
        styleObj['default?'] = styleObj.isdefault;
        delete styleObj.isdefault;
      });
      res.status(200).send(result);
    }
  });
});

app.get('/products/:productId/related', (req, res) => {
  //  do some stuff to generate the product's related products'
  db.getRelated(req.params.productId, (err, result) => {
    if (err) {
      console.log('Error reading related info');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.sendStatus(404);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(200).send(result);
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log('Listening on http://', HOST, PORT);
});

module.exports = app;
