class ConsolePublisher {
  constructor() {}

  publish(params) {
    const outout = JSON.stringify(params, null, 2);
    console.log(outout);
  }
}

module.exports = ConsolePublisher;
