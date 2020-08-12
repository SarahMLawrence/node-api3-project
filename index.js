// code away!
const express = require('express');
const logger = require('./middleware/logger');
const welcomeRouter = require('./welcome/welcome-router');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();
const port = 4000;

server.use(express.json());
server.use(logger());
server.use(welcomeRouter);
server.use(userRouter);
server.use(postRouter);

server.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});


//custom middleware

// function logger(req, res, next) {}

module.exports = server;
