const express = require("express");
const router = express.Router();

const usersHandler = require("./users.handler");

router.post("/", (req, res) => {
  usersHandler.createUser(req.body)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.get("/:id", (req, res) => {
  usersHandler.getUserById(req.params.id)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.get("/", (req, res) => {
  usersHandler.getUser(req.body)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.put("/:id", (req, res) => {
  usersHandler.createUser(req.body)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

router.delete("/:id", (req, res) => {
  usersHandler.createUser(req.body)
  .then(e => res.json(e))
  .catch((err) => {    
    res.status(500).json(err)
  })
});

module.exports = router;