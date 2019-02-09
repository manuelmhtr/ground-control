const assert = require('assert');

const SPEED_INCREASE = 10;

class KeyboardInputHandler {
  constructor(params = {}) {
    const {robot} = params;

    assert(robot, 'robot is required');

    this.robot = robot;
    launchHandler(this);
  }
}

function launchHandler(handler) {
  const stdin = process.stdin;
  const {robot} = handler;

  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on('data', (key) => {
    if (key === '\u0003') process.exit();
    if (key === 'k') robot.rightMotor.addSpeed(SPEED_INCREASE);
    if (key === 'm') robot.rightMotor.addSpeed(-1 * SPEED_INCREASE);
    if (key === 'a') robot.leftMotor.addSpeed(SPEED_INCREASE);
    if (key === 'z') robot.leftMotor.addSpeed(-1 * SPEED_INCREASE);
    if (key === ' ') {
      robot.rightMotor.stop();
      robot.leftMotor.stop();
    }
  });
}

module.exports = KeyboardInputHandler;
