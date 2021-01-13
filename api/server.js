const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const server = express();

const users = require('./users/users.js')

server.use(express.json(), cors(), helmet());
server.use('/users', users)


server.get('/',(req,res) =>{
    res.send('Hi');
});



module.exports = server;