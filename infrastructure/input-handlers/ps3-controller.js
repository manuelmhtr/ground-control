const HID = require('node-hid');
const assert = require('assert');

const INPUT_COMMANDS = require('../../entities/commands/input');
const PS3_CONTROLLER_NAME = 'PLAYSTATION(R)3 Controller';
const LEFT_STICK_BYTE = 7;
const LEFT_TRIGGER_BYTE = 18;
const RIGHT_TRIGGER_BYTE = 19;
const X_BUTTON_BYTE = 24;
const INPUT_MIN = 0;
const INPUT_MAX = 255;
const INPUT_MIDDLE = (INPUT_MIN + INPUT_MAX) / 2;
const START_MARGIN = 10;
const MID_HIGH = INPUT_MIDDLE + START_MARGIN;
const MID_LOW = INPUT_MIDDLE - START_MARGIN;
const MAX_SPEED = 50;
const MAX_TURN = 100;
const STOP_STATUS = { speed: 0, turn: 0 };

class PS3ControllerInputHandler {
  constructor() {
    this.events = {};
    this.device = getPS3Device();
    if (!this.device) return console.error('PS3 controller not connected');
    this.controller = new HID.HID(this.device.path);
    this.status = STOP_STATUS;
    this.__launchHandler();
  }

  on(event, callback) {
    assert(event, 'event name required');
    this.events[event] = callback;
  }

  __launchHandler() {
    this.controller.on('data', (data) => {
      if (data[X_BUTTON_BYTE]) return this.__triggerStop();
      const speedValue = normalizeSpeed(data[LEFT_STICK_BYTE]);
      const leftValue = normalizeTurn(data[LEFT_TRIGGER_BYTE]);
      const rightValue = normalizeTurn(data[RIGHT_TRIGGER_BYTE]);
      const newStatus = this.__calculateNewStatus(speedValue, leftValue, rightValue);
      this.__setStatusIfChanged(newStatus);
    });
  }

  __calculateNewStatus(speed, leftValue, rightValue) {
    const turn = rightValue - leftValue;
    return {speed, turn};
  }

  __triggerStop() {
    this.__setStatus(STOP_STATUS, true);
  }

  __setStatusIfChanged(newStatus) {
    const didStatusChanged = Object.keys(this.status).some(key => {
      return this.status[key] !== newStatus[key];
    });
    if (didStatusChanged) this.__setStatus(newStatus);
  }

  __setStatus(newStatus, setImmediately) {
    console.log(newStatus, setImmediately);
    this.status.turn = newStatus.turn;
    this.status.speed = newStatus.speed;
    const event = setImmediately ? INPUT_COMMANDS.SET_STATUS_IMMEDIATELY : INPUT_COMMANDS.SET_STATUS;
    this.__emitEvent(event, this.status);
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

function normalizeSpeed(input) {
  const inverse = INPUT_MAX - input;
  if (inverse >= MID_HIGH) return Math.round(MAX_SPEED * (inverse - MID_HIGH) / (INPUT_MAX - MID_HIGH));
  if (inverse <= MID_LOW) return Math.round(MAX_SPEED * ((inverse - INPUT_MIN) / (MID_LOW - INPUT_MIN) - 1));
  return 0;
}

function normalizeTurn(input) {
  return Math.round(input * MAX_TURN / INPUT_MAX);
}

module.exports = PS3ControllerInputHandler;
