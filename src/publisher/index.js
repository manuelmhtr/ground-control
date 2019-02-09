const ConsoleGateway = require('./gateways/console');

class Publisher {
  constructor() {
    this.publishers = [
      new ConsoleGateway()
    ];
  }

  publish(data) {
    this.publishers.forEach(publisher => {
      publisher.publish(data);
    });
  }
}

module.exports = Publisher;
