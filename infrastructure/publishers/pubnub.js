class PubnubPublisher {
  constructor() {
    this.pubnub = require('../sockets/pubnub');
  }

  publish(args) {
    const {channel} = args;
    const message = {
      command: args.message,
      data: args.data
    };
    const params = { channel, message };
    this.pubnub.publish(params, response => {
      if (response.error) console.error(response);
    });
  }
}

module.exports = PubnubPublisher;
