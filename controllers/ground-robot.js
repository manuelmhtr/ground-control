const assert = require('assert');
const {debounce} = require('lodash');

const INPUT_COMMANDS = require('../entities/commands/input');
const REMOTE_COMMANDS = require('../entities/commands/remote');
const ROBOT_EVENTS = require('../entities/events/robot');
const MOTOR_NAMES = require('../entities/enums/motor-names');
const DEBOUNCE_TIME = 100;
const MAX_DEBOUNCE_WAIT = 500;

class GroundRobotController {
  constructor(params = {}) {
    const {
      robot,
      commandsPublisher,
      statusPublisher,
      inputHandler
    } = params;

    assert(robot, 'robot is required');
    assert(commandsPublisher, 'commandsPublisher is required');
    assert(statusPublisher, 'statusPublisher is required');
    assert(inputHandler, 'inputHandler is required');

    this.robot = robot;
    this.commandsPublisher = commandsPublisher;
    this.statusPublisher = statusPublisher;
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
  const channel = this.robot.id;
  const message = REMOTE_COMMANDS.SET_SPEED;
  const debounceOptions = { maxWait: MAX_DEBOUNCE_WAIT };

  const publishRightMotorChange = debounce((...args) => this.commandsPublisher.publish(...args), DEBOUNCE_TIME, debounceOptions);
  const publishLeftMotorChange = debounce((...args) => this.commandsPublisher.publish(...args), DEBOUNCE_TIME, debounceOptions);
  const publishRobotStatusUpdate = debounce((...args) => this.statusPublisher.publish(...args), DEBOUNCE_TIME, debounceOptions);

  this.robot.on(ROBOT_EVENTS.CHANGED_RIGHT_MOTOR_SPEED, params => {
    const data = {...params, motor: MOTOR_NAMES.RIGHT};
    publishRightMotorChange({channel, message, data});
    publishRobotStatusUpdate(this.robot.toJSON());
  });

  this.robot.on(ROBOT_EVENTS.CHANGED_LEFT_MOTOR_SPEED, params => {
    const data = {...params, motor: MOTOR_NAMES.LEFT};
    publishLeftMotorChange({channel, message, data});
    publishRobotStatusUpdate(this.robot.toJSON());
  });
}

module.exports = GroundRobotController;
