class PubnubPublisher {
  constructor() {
    this.pubnub = require('../sockets/pubnub');
  }

  publish(args) {
    const params = {
      channel: args.channel,
      message: args.message,
      meta: args.data
    };
    this.pubnub.publish(params, response => {
      if (response.error) console.error(response);
    });
  }
}

module.exports = PubnubPublisher;
