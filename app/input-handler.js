const assert = require('assert');

class InputHandler {
  constructor(params = {}) {
    const {inputHandlers} = params;

    assert(inputHandlers, 'inputHandlers is required');

    this.inputHandlers = inputHandlers;
  }

  on(event, callback) {
    this.inputHandlers.forEach(inputHandler => {
      inputHandler.on(event, callback);
    });
  }
}

module.exports = InputHandler;
