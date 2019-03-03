class PubnubStatusListener {
  constructor() {
    this.pubnub = require('../sockets/pubnub');
  }

  onUpdate(callback) {
    this.pubnub.addListener({
      message: data => callback(data.message)
    });
  }

  subscribe(channel) {
    this.pubnub.subscribe({
      channels: [channel]
    });
  }
}

module.exports = PubnubStatusListener;
