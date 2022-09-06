const express = require("express");
const router = express.Router();

const productsHandler = require("./products.handler");

router.post("/", (req, res) => {
  productsHandler.createProduct(req.body)
  .then(e => res.json(e))
  .catch((error) => {
    res.status(500).json(error)
  })
});

router.get("/:id", (req, res) => {
  productsHandler.getProductsById(req.params.id)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.get("/", (req, res) => {
  productsHandler.getProducts()
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.put("/:id", (req, res) => {
  productsHandler.editProduct(req.params.id, req.body)
    .then(e =>{
      res.send(e)
    })
    .catch((err) => {    
      res.status(500).json(err)
    })
});

router.delete("/:id", (req, res) => {
  productsHandler.deleteProduct(req.params.id)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

module.exports = router;