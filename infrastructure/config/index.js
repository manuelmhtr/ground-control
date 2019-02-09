const {parsed: data} = require('./load');

const getPubnubConfig = () => {
  return {
    subscribeKey: data.PUBNUB_SUBSCRIBE_KEY,
    publishKey: data.PUBNUB_PUBLISH_KEY,
    secretKey: data.PUBNUB_SECRET_KEY,
    ssl: true
  };
};

module.exports = {
  getPubnubConfig
};
