const express = require("express");
const router = express.Router();

const orderProductsHandler = require("./orderProducts.handler");

router.post("/", (req, res) => {
    orderProductsHandler.createOrderProducts(req.body)
  .then(e => res.json(e))
  .catch((err) => res.json(err))
});

router.get("/:id", (req, res) => {
});

router.get("/", (req, res) => {
  res.json('oi');
});

router.put("/:id", (req, res) => {
});

router.delete("/:id", (req, res) => {
    orderProductsHandler.deleteOrderProducts(req.params.id)
    .then(e => res.send(e))
    .catch(err => {
        res.send(err)
    })
});

module.exports = router;