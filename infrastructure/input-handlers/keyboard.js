const INPUT_EVENTS = require('../../entities/enums/input-events');

const SPEED_INCREMENT = 10;

class KeyboardInputHandler {
  constructor() {
    this.events = {};
    launchHandler.call(this);
  }

  on(event, callback) {
    this.events[event] = callback;
  }
}

function launchHandler() {
  const stdin = process.stdin;
  const launchEvent = (event, data) => {
    const cb = this.events[event];
    if (cb) cb(data);
  };

  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on('data', (key) => {
    if (key === '\u0003') process.exit();
    if (key === 'k') launchEvent(INPUT_EVENTS.INCREMENT_SPEED, {motor: 'right', increment: SPEED_INCREMENT});
    if (key === 'm') launchEvent(INPUT_EVENTS.INCREMENT_SPEED, {motor: 'right', increment: -1 * SPEED_INCREMENT});
    if (key === 'a') launchEvent(INPUT_EVENTS.INCREMENT_SPEED, {motor: 'left', increment: SPEED_INCREMENT});
    if (key === 'z') launchEvent(INPUT_EVENTS.INCREMENT_SPEED, {motor: 'left', increment: -1 * SPEED_INCREMENT});
    if (key === ' ') launchEvent(INPUT_EVENTS.STOP);
  });
}

module.exports = KeyboardInputHandler;
