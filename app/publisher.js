const assert = require('assert');

class Publisher {
  constructor(params = {}) {
    const {publishers} = params;

    assert(publishers, 'publishers is required');

    this.publishers = publishers;
  }

  publish(data) {
    this.publishers.forEach(publisher => {
      publisher.publish(data);
    });
  }
}

module.exports = Publisher;
