const express = require("express");

const db = require('../../data/dbConfig')

const router = express.Router();

router.get("/", (req, res) => {
  db('users')
    .then(users =>{
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(properties => {
      if (properties) {
        res.status(200).json(properties);
      } else {
        res
          .status(404)
          .json({ error: "The specified property does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});



router.get("/landlord/:id", (req, res) => {
  const { id } = req.params;

  db.getByLandlordId(id)
    .then(properties => {
      if (properties) {
        res.status(200).json(properties);
      } else {
        res.status(404).json({ error: "no properties were found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.post("/", (req, res, next) => {
  const property = req.body;
  console.log("create", property);
  db.create(property)
    .then(property => {
      res.status(201).json({ property });
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: `${err}` });
    });
});


router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const property = req.body;
  console.log("edit", id, property);
  db.editById(id, property)
    .then(property => {
      if (property) {
        res.status(200).json({ message: "Property updated." });
      } else {
        res.status(404).json({ error: "No property found." });
      }
    })
    .catch(err => {
      next("h500", err);
    });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deleteById(id)
    .then(property => {
      if (property) {
        res.status(202).json({ message: "Property deleted." });
      } else {
        res
          .status(404)
          .json({ error: "The property specified does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});

module.exports = router;
