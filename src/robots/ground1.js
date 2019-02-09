const {BrushedMotor} = require('./motors');

class Ground1Model {
  constructor(params = {}) {
    const onChange = callOnChange.bind(this);
    this.rightMotor = new BrushedMotor({onChange});
    this.leftMotor = new BrushedMotor({onChange});

    this.onChange = params.onChange;
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

module.exports = Ground1Model;
