const assert = require('assert');

class Publisher {
  constructor(params = {}) {
    const {publishers} = params;

    assert(publishers, 'publishers is required');

    this.publishers = publishers;
  }

  publish(event, data) {
    this.publishers.forEach(publisher => {
      publisher.publish(event, data);
    });
  }
}

module.exports = Publisher;
