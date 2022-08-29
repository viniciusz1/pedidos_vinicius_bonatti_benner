const express = require('express');
const router = express.Router();

const users = require('./api/users/users.controller');
const products = require('./api/products/products.controller')
const orders = require('./api/orders/orders.controller')
const orderProducts = require('./api/orderProducts/orderProducts.controller')

router.use('/users', users);
router.use('/products', products);
router.use('/orders', orders);
router.use('/orderProducts', orderProducts);

module.exports = router;