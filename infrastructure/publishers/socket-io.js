class SocketIOPublisher {
  constructor() {
    this.io = require('../sockets/io');
  }

  publish(args) {
    this.io.emit('ROBOT_STATUS_UPDATE', args);
  }
}

module.exports = SocketIOPublisher;
