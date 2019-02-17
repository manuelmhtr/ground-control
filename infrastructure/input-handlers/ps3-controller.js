const HID = require('node-hid');
const assert = require('assert');

const INPUT_COMMANDS = require('../../entities/commands/input');
const PS3_CONTROLLER_NAME = 'PLAYSTATION(R)3 Controller';
const LEFT_STICK_BYTE = 7;
const RIGHT_STICK_BYTE = 9;
const X_BUTTON_BYTE = 24;
const INPUT_MIN = 0;
const INPUT_MAX = 255;
const INPUT_MIDDLE = (INPUT_MIN + INPUT_MAX) / 2;
const START_MARGIN = 10;
const MID_HIGH = INPUT_MIDDLE + START_MARGIN;
const MID_LOW = INPUT_MIDDLE - START_MARGIN;
const MAX_SPEED = 50;

class PS3ControllerInputHandler {
  constructor() {
    this.events = {};
    this.device = getPS3Device();
    this.controller = new HID.HID(this.device.path);
    this.values = {right: 0, left: 0};
    this.__launchHandler();
  }

  on(event, callback) {
    assert(event, 'event name required');
    this.events[event] = callback;
  }

  __launchHandler() {
    this.controller.on('data', (data) => {
      if (data[X_BUTTON_BYTE]) return this.__triggerStop();
      const leftValue = inputToSpeeds(data[LEFT_STICK_BYTE]);
      const rightValue = inputToSpeeds(data[RIGHT_STICK_BYTE]);
      this.__setValue('right', rightValue);
      this.__setValue('left', leftValue);
    });
  }

  __triggerStop() {
    this.__setValue('left', 0);
    this.__setValue('right', 0);
  }

  __setValue(type, newValue) {
    const oldValue = this.values[type];
    this.values[type] = newValue;
    if (oldValue !== newValue) this.__onValueChange(type, newValue);
  }

  __onValueChange(type, value) {
    this.__emitEvent(INPUT_COMMANDS.SET_SPEED, {motor: type, speed: value});
  }

  __emitEvent(event, data) {
    const cb = this.events[event];
    if (cb) cb(data);
  }
}

function getPS3Device() {
  const devices = HID.devices();
  const [ps3Device] = devices.filter(device => {
    if (device.product !== PS3_CONTROLLER_NAME) return false;
    return !!device.serialNumber;
  });
  return ps3Device;
}

function inputToSpeeds(input) {
  const inverse = INPUT_MAX - input;
  if (inverse >= MID_HIGH) return Math.round(MAX_SPEED * (inverse - MID_HIGH) / (INPUT_MAX - MID_HIGH));
  if (inverse <= MID_LOW) return Math.round(MAX_SPEED * ((inverse - INPUT_MIN) / (MID_LOW - INPUT_MIN) - 1));
  return 0;
}

module.exports = PS3ControllerInputHandler;
