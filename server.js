const express = require('express');
const server = express();

server.use(express.json());
const cors = require('cors');
server.use(cors());
const helmet = require('helmet');
server.use(helmet());

const apiRouter = require('./api/apiRouter');

server.use('/api', apiRouter);

//404 fallback
server.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found` })
})

module.exports = server;