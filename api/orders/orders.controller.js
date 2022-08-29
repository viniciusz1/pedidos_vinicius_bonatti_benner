const express = require("express");
const router = express.Router();

const ordersHandler = require("./orders.handler");

router.post("/", (req, res) => {
    ordersHandler.createOrder(req.body)
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
});

module.exports = router;