const http = require('http');
const socketIO = require('socket.io');
const {getServerConfig} = require('../config');

const serverConfig = getServerConfig();
const server = http.createServer();

const io = socketIO(server, {
  path: '/socket',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(serverConfig.port);

module.exports = io;
