const assert = require('assert');
const {BrushedMotor} = require('../motors');

const MOTOR_EVENTS = require('../../entities/events/motor');
const ROBOT_EVENTS = require('../../entities/events/robot');
const RIGHT_MOTOR_NAME = 'right';
const LEFT_MOTOR_NAME = 'left';

class GroundV1Robot {
  constructor(params = {}) {
    const {id} = params;
    this.id = id;
    this.events = {};
    this.rightMotor = new BrushedMotor();
    this.leftMotor = new BrushedMotor();

    bindEvents.call(this);
  }

  on(event, callback) {
    assert(event, 'event name required');
    this.events[event] = callback;
  }

  stop() {
    this.rightMotor.stop();
    this.leftMotor.stop();
  }

  toJSON() {
    return {
      rightMotor: this.rightMotor.toJSON(),
      leftMotor: this.leftMotor.toJSON()
    };
  }
}

function bindEvents() {
  this.rightMotor.on(MOTOR_EVENTS.CHANGED_SPEED, (data) => {
    launchEvent.call(this, ROBOT_EVENTS.CHANGED_MOTOR_SPEED, {
      ...data,
      motor: RIGHT_MOTOR_NAME
    });
  });

  this.leftMotor.on(MOTOR_EVENTS.CHANGED_SPEED, (data) => {
    launchEvent.call(this, ROBOT_EVENTS.CHANGED_MOTOR_SPEED, {
      ...data,
      motor: LEFT_MOTOR_NAME
    });
  });
}

function launchEvent(event, params) {
  const cb = this.events[event];
  if (cb) cb(params);
}

module.exports = GroundV1Robot;
