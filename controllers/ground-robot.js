const assert = require('assert');

const INPUT_EVENTS = require('../entities/enums/input-events');

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
    const onChange = data => this.publisher.publish(data);

    this.inputHandler.on(INPUT_EVENTS.INCREMENT_SPEED, ({motor, increment}) => {
      console.log(INPUT_EVENTS.INCREMENT_SPEED, {motor, increment});
      if (motor === 'right') this.robot.rightMotor.incrementSpeed(increment);
      if (motor === 'left') this.robot.leftMotor.incrementSpeed(increment);
    });

    this.inputHandler.on(INPUT_EVENTS.SET_SPEED, ({motor, speed}) => {
      console.log(INPUT_EVENTS.SET_SPEED, {motor, speed});
      if (motor === 'right') this.robot.rightMotor.setSpeed(speed);
      if (motor === 'left') this.robot.leftMotor.setSpeed(speed);
    });

    this.inputHandler.on(INPUT_EVENTS.STOP, () => {
      this.robot.stop();
    });

    this.robot.setOnChange(onChange);
  }
}

module.exports = GroundRobotController;
