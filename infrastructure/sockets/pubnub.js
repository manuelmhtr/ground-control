const PubNub = require('pubnub');
const {getPubnubConfig} = require('../config');

const pubnub = new PubNub(getPubnubConfig());

module.exports = pubnub;
