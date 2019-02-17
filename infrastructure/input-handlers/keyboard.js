const assert = require('assert');

const INPUT_COMMANDS = require('../../entities/commands/input');
const SPEED_INCREMENT = 10;

class KeyboardInputHandler {
  constructor() {
    this.events = {};
    launchHandler.call(this);
  }

  on(event, callback) {
    assert(event, 'event name required');
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
    const cmd = key.toLowerCase();
    if (cmd === '\u0003') process.exit();
    if (cmd === 'k') launchEvent(INPUT_COMMANDS.INCREMENT_SPEED, {motor: 'right', increment: SPEED_INCREMENT});
    if (cmd === 'm') launchEvent(INPUT_COMMANDS.INCREMENT_SPEED, {motor: 'right', increment: -1 * SPEED_INCREMENT});
    if (cmd === 'a') launchEvent(INPUT_COMMANDS.INCREMENT_SPEED, {motor: 'left', increment: SPEED_INCREMENT});
    if (cmd === 'z') launchEvent(INPUT_COMMANDS.INCREMENT_SPEED, {motor: 'left', increment: -1 * SPEED_INCREMENT});
    if (cmd === ' ') launchEvent(INPUT_COMMANDS.STOP);
  });
}

module.exports = KeyboardInputHandler;
