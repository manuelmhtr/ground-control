class ConsolePublisher {
  constructor() {}

  publish(data) {
    const outout = JSON.stringify(data, null, 2);
    console.log(outout);
  }
}

module.exports = ConsolePublisher;
