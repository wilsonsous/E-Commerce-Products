const router = require('express').Router();
const Product = require('../models/Product');

router.get('/product/:id', async (req, res) => {
    try {
    // Search the database for a product with an id that matches params
    const productData = await Product.findAll();
    console.log(productData)
    // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
    const product = productData.get({ plain: true });
    const product = productData.map(product => product.get({plain: true}))
    // Then, the 'product' template is rendered and dish is passed into the template.
    res.render('product', product);
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  module.exports = router;
  