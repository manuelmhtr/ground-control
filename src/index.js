const {Ground1Robot} = require('./robots');
const {KeyboardInputHandler} = require('./input-handlers');
const Publisher = require('./publisher');

function lauchGroundControl() {
  const publisher = initPublisher();
  const robot = initRobot(publisher);
  initInputHandlers(robot);
}

function initRobot(publisher) {
  const onChange = args => publisher.publish(args);
  return new Ground1Robot({onChange});
}

function initPublisher() {
  return new Publisher();
}

function initInputHandlers(robot) {
  return [
    new KeyboardInputHandler({robot})
  ];
}

lauchGroundControl();
