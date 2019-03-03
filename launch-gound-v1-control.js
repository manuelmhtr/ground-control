const {ConsolePublisher, PubnubPublisher, SocketIOPublisher} = require('./infrastructure/publishers');
const {KeyboardInputHandler, PS3ControllerInputHandler} = require('./infrastructure/input-handlers');
const {PubnubStatusListener} = require('./infrastructure/status-listeners');
const {getRobotId} = require('./infrastructure/config');
const Publisher = require('./app/publisher');
const InputHandler = require('./app/input-handler');
const GroundRobotController = require('./controllers/ground-robot');
const {GroundV1Robot} = require('./entities/robots');

function lauchGroundControl() {
  const robot = getRobot();
  const commandsPublisher = getCommandsPublisher();
  const statusPublisher = getStatusPublisher();
  const statusListener = getStatusListener();
  const inputHandler = getInputHandler();
  const controller = new GroundRobotController({
    robot,
    commandsPublisher,
    statusPublisher,
    statusListener,
    inputHandler
  });
  controller.start();
}

function getRobot() {
  const robotId = getRobotId();
  return new GroundV1Robot({
    id: robotId
  });
}

function getCommandsPublisher() {
  const publishers = [
    new ConsolePublisher(),
    new PubnubPublisher()
  ];
  return new Publisher({publishers});
}

function getStatusPublisher() {
  const publishers = [
    new ConsolePublisher(),
    new SocketIOPublisher()
  ];
  return new Publisher({publishers});
}

function getStatusListener() {
  return new PubnubStatusListener();
}

function getInputHandler() {
  const inputHandlers = [
    new KeyboardInputHandler(),
    new PS3ControllerInputHandler()
  ];
  return new InputHandler({inputHandlers});
}

lauchGroundControl();

