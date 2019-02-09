const assert = require('assert');

const SPEED = { MIN: -100, MAX: 100 };
const SPEED_STOP = 0;

class BrushedMotor {
  constructor(params = {}) {
    this.speed = 0;
    this.onChange = params.onChange;
  }

  setOnChange(onChange) {
    this.onChange = onChange;
  }

  setSpeed(speed) {
    assert(speed >= SPEED.MIN, `speed must be higher than ${SPEED.MIN}`);
    assert(speed <= SPEED.MAX, `speed must be lower than ${SPEED.MAX}`);
    this.speed = speed;
    callOnChange.call(this);
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

function callOnChange() {
  if (!this.onChange) return;
  const args = this.toJSON();
  this.onChange(args);
}

module.exports = BrushedMotor;
