# Ground Control

![](https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg?style=flat)
![](https://img.shields.io/badge/yarn-1.13-blue.svg?style=flat)
![](https://img.shields.io/badge/Go-Pioneer!-yellow.svg?style=flat)

Application that connects to a robot using sockets, with the objective of tracking it and sending commands.

## Usage

1. Connect a keyboard, and optionally a PlayStation 3 controller.

2. Install dependencies:

```bash
npm install
```

3. Run app:

```bash
npm start
```

## Commands

Ground Control support 2 inputs: Keyboard and PlayStation 3 controller. Each input can send the following commands to the robot:

**Keyboard**

* `a`: Increases the speed of LEFT motor by 10 units.
* `z`: Decreases the speed of LEFT motor by 10 units.
* `k`: Increases the speed of RIGHT motor by 10 units.
* `m`: Decreases the speed of RIGHT motor by 10 units.
* `space bar`: Stops both motors.

**PlayStation 3 contoller**

* `Y-axis of left joystick`: Sets the speed of LEFT motor (from -100 to 100).
* `Y-axis of right joystick`: Sets the speed of RIGHT motor (from -100 to 100).
* `X button`: Stops both motors.
