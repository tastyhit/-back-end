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
  db.select('*')
    .from('users')
    .where({id})
    .first()
    .then(user => {
      res.status(200).json({data:user});
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});






router.post("/", (req, res, next) => {
  const postData = req.body;
  db('users')
    .insert(postData, 'id')
    .then(ids => {
      db('users')
                .where({id: ids[0]})
                .first()
                .then(acc =>{
                  res.status(200).json({data:acc})
                })
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  
  db('users')
    .where({id})
    .update(changes)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "User updated." });
      } else {
        res.status(404).json({ error: "No user found." });
      }
    })
    .catch(err => {
      next("h500", err);
    });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db('users')
    .from('users')
    .where({id})
    .del()
    .then(user => {
      if (user) {
        res.status(202).json({ message: "User deleted." });
      } else {
        res
          .status(404)
          .json({ error: "The user specified does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.post("/login", (req,res)=>{
  const { phone } = req.body;
  db.select('*')
  .from('users')
  .where({phone})
  .update({otp: Math.floor(Math.random()*9000) + 10000})
  .then(user =>{
    res.status(200).json({message: "OTP sent"})
  })
  .catch(err => {
    res.status(500).json({ error: `${err}` });
  });
})

module.exports = router;
