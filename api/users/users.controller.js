const express = require("express");
const router = express.Router();

const usersHandler = require("./users.handler");

router.post("/", (req, res) => {
  usersHandler.createUser(req.body)
  .then(e => res.json(e))
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