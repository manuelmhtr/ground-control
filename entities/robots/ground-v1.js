const {BrushedMotor} = require('../motors');

class GroundV1Robot {
  constructor(params = {}) {
    const onChange = callOnChange.bind(this);
    this.rightMotor = new BrushedMotor({onChange});
    this.leftMotor = new BrushedMotor({onChange});

    this.onChange = params.onChange;
  }

  setOnChange(onChange) {
    this.onChange = onChange;
    this.rightMotor.setOnChange(callOnChange.bind(this));
    this.leftMotor.setOnChange(callOnChange.bind(this));
  }

  stop() {
    this.rightMotor.stop();
    this.leftMotor.stop();
  }

  toJSON() {
    return {
      rightMotor: this.rightMotor.toJSON(),
      leftMotor: this.leftMotor.toJSON()
    };
  }
}

function callOnChange() {
  if (!this.onChange) return;
  const args = this.toJSON();
  this.onChange(args);
}

module.exports = GroundV1Robot;
