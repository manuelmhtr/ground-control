const assert = require('assert');

const MOTOR_EVENTS = require('../../entities/events/motor');
const SPEED = { MIN: -100, MAX: 100 };
const SPEED_STOP = 0;

class BrushedMotor {
  constructor() {
    this.speed = 0;
    this.events = {};
  }

  on(event, callback) {
    assert(event, 'event name required');
    this.events[event] = callback;
  }

  setSpeed(speed) {
    assert(speed >= SPEED.MIN, `speed must be higher than ${SPEED.MIN}`);
    assert(speed <= SPEED.MAX, `speed must be lower than ${SPEED.MAX}`);
    this.speed = speed;
    launchEvent.call(this, MOTOR_EVENTS.CHANGED_SPEED, this.toJSON());
  }

  incrementSpeed(increment) {
    const newSpeed = Math.max(Math.min(this.speed + increment, SPEED.MAX), SPEED.MIN);
    this.setSpeed(newSpeed);
  }

  stop() {
    this.setSpeed(SPEED_STOP);
  }

  toJSON() {
    return {
      speed: this.speed
    };
  }
}

function launchEvent(event, params) {
  const cb = this.events[event];
  if (cb) cb(params);
}

module.exports = BrushedMotor;
