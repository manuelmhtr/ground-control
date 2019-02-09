const assert = require('assert');

const INPUT_COMMANDS = require('../entities/commands/input');
const REMOTE_COMMANDS = require('../entities/commands/remote');
const ROBOT_EVENTS = require('../entities/events/robot');

class GroundRobotController {
  constructor(params = {}) {
    const {robot, publisher, inputHandler} = params;

    assert(robot, 'robot is required');
    assert(publisher, 'publisher is required');
    assert(inputHandler, 'inputHandler is required');

    this.robot = robot;
    this.publisher = publisher;
    this.inputHandler = inputHandler;
  }

  start() {
    bindInputHandlerEvents.call(this);
    bindRobotEvents.call(this);
  }
}

function bindInputHandlerEvents() {
  this.inputHandler.on(INPUT_COMMANDS.INCREMENT_SPEED, ({motor, increment}) => {
    if (motor === 'right') this.robot.rightMotor.incrementSpeed(increment);
    if (motor === 'left') this.robot.leftMotor.incrementSpeed(increment);
  });

  this.inputHandler.on(INPUT_COMMANDS.SET_SPEED, ({motor, speed}) => {
    if (motor === 'right') this.robot.rightMotor.setSpeed(speed);
    if (motor === 'left') this.robot.leftMotor.setSpeed(speed);
  });

  this.inputHandler.on(INPUT_COMMANDS.STOP, () => {
    this.robot.stop();
  });
}

function bindRobotEvents() {
  this.robot.on(ROBOT_EVENTS.CHANGED_MOTOR_SPEED, data => {
    const channel = this.robot.id;
    const message = REMOTE_COMMANDS.SET_SPEED;
    this.publisher.publish({channel, message, data});
  });
}

module.exports = GroundRobotController;
