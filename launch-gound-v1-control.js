const {ConsolePublisher} = require('./infrastructure/publishers');
const {KeyboardInputHandler} = require('./infrastructure/input-handlers');
const Publisher = require('./app/publisher');
const InputHandler = require('./app/input-handler');
const GroundRobotController = require('./controllers/ground-robot');
const {GroundV1Robot} = require('./entities/robots');

function lauchGroundControl() {
  const publisher = getPublisher();
  const inputHandler = getInputHandler();
  const robot = new GroundV1Robot();
  const controller = new GroundRobotController({
    robot,
    publisher,
    inputHandler
  });
  controller.start();
}

function getPublisher() {
  const publishers = [
    new ConsolePublisher()
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

