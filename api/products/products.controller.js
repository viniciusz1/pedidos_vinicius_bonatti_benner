const express = require("express");
const router = express.Router();

const productsHandler = require("./products.handler");

router.post("/", (req, res) => {
  productsHandler.createProduct(req.body)
  .then(e => res.json(e))
});

router.get("/:id", (req, res) => {
  res.send('products')
});

router.get("/", (req, res) => {
  res.json('oi');
});

router.put("/:id", (req, res) => {
});

router.delete("/:id", (req, res) => {
});

module.exports = router;