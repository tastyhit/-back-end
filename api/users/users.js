require('dotenv').config();

const express = require("express");


const db = require('../users/helper_users')
const router = express.Router();


const accountSid = process.env.accountSid
const authToken = process.env.authToken

const client = require('twilio')(accountSid, authToken)




router.get("/", (req, res) => {
  db.get()
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
    .then(user => {
      if (user){
        res.status(200).json(user);
      } else {
        res.status(400).json({error: 'User not found'});
      }
      
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.get('/search', (req,res)=>{
  const  data  = req.body;
  if('phone' in data){
    db.getByPhone(Object.values(data))
      .then(user=>{
        if (user){
          res.status(200).json(user);
        } else {
          res.status(400).json({error: 'User not found'});
        }
      })
      .catch(err=>{
        res.status(500).json({error: `${err}`})
      })
  }else{
    db.getByEmail(Object.values(data))
      .then(user=>{
        if (user){
          res.status(200).json(user);
        } else {
          res.status(400).json({error: 'User not found'});
        }
      })
      .catch(err=>{
        res.status(500).json({error: `${err}`})
      })
  }
})



router.post("/", (req, res, next) => {
  const user = req.body;
  db.create(user)
    .then(ids => {
      db.getById(ids[0])
        .then(acc =>{
            res.status(200).json(acc.id)
          })
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  
  db.editById(id, changes)
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
  db.deleteById(id)
    .then(user => {
      if (user) {
        res.status(202).json({ message: "User deleted." });
      } else {
        res.status(404).json({ error: "The user specified does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `${err}` });
    });
});


router.post("/login", (req,res)=>{
  const { phone } = req.body;
  const otp = Math.floor(Math.random()*9000) + 10000
  db.getByNumber(phone)
  .update({otp: otp })
  .then(user =>{
    sendSMS(phone, otp)
    res.status(200).json({message: "OTP sent"})
    
  })
  .catch(err => {
    res.status(500).json({ error: `${err}` });
  });
})

router.post("/auth", (req,res)=>{
  const phone = req.body.phone
  const otp = req.body.otp
  db.getByOTP(phone, otp)
    .then(user =>{
      res.status(200).json({message: 'OTP authenticate'})
    })
    .catch(err=>{
      res.status(500).json({error: `${err}`})
    })
    
})



const sendSMS = (phone , message) =>{
  client.messages
  .create({
    body: message,  
      messagingServiceSid: 'MGc385b47ad8878c4ca34d0e08dec60c30',      
      to: phone 
  })
  .then(message => console.log(message.sid)) 

}

module.exports = router;
