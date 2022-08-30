const express = require("express");
const router = express.Router();

const ordersHandler = require("./orders.handler");

router.post("/", (req, res) => {
    ordersHandler.createOrder(req.body)
  .then(e => res.json(e))
  .catch((err) => res.json(err))
});

router.get("/:id", (req, res) => {
  ordersHandler.getOrderById(req.params.id)
  .then(e => res.json(e))
  .catch((err) => res.json(err))
});

router.get("/", (req, res) => {
  ordersHandler.getOrders()
  .then(e => res.json(e))
  .catch((err) => res.json(err))
});

router.put("/:id", (req, res) => {
    ordersHandler.editOrder(req.params.id, req.body)
    .then(e =>{
      res.send(e)
    })
    .catch(err => {
      res.send(err)
    })
});

router.delete("/:id", (req, res) => {
  ordersHandler.deleteOrder(req.params.id)
  .then(e => res.json(e))
  .catch((err) => res.json(err))
});

module.exports = router;