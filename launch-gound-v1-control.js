const {ConsolePublisher, PubnubPublisher} = require('./infrastructure/publishers');
const {KeyboardInputHandler} = require('./infrastructure/input-handlers');
const Publisher = require('./app/publisher');
const InputHandler = require('./app/input-handler');
const GroundRobotController = require('./controllers/ground-robot');
const {GroundV1Robot} = require('./entities/robots');

function lauchGroundControl() {
  const publisher = getPublisher();
  const inputHandler = getInputHandler();
  const robot = getRobot();
  const controller = new GroundRobotController({
    robot,
    publisher,
    inputHandler
  });
  controller.start();
}

function getRobot() {
  const robotId = process.env.ROBOT_ID;
  return new GroundV1Robot({
    id: robotId
  });
}

function getPublisher() {
  const publishers = [
    new ConsolePublisher(),
    new PubnubPublisher()
  ];
  return new Publisher({publishers});
}

function getInputHandler() {
  const inputHandlers = [
    new KeyboardInputHandler()
  ];
  return new InputHandler({inputHandlers});
}

lauchGroundControl();

