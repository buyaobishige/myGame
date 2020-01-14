let joystick = require("./joyStick");

cc.Class({
  extends: joystick,

  properties: {
    defaultSpeed: {
      default: 10,
      type: cc.Integer
    },
    ballObj: {
      default: null,
      type: cc.RigidBody
    },
    stickObj: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
  },

  update(dt) {
    // console.log(this.stickObj.x);
    // console.log(this.ballObj.linearVelocity);

    if (this.stickObj.x === 0 && this.stickObj.y === 0) {
      this.ballObj.linearVelocity=cc.v2(0,0);
    } else {
      this.stick.k = Math.sqrt(
        (this.stickObj.x * this.stickObj.x +
          this.stickObj.y * this.stickObj.y) /
          (this.defaultSpeed * this.defaultSpeed)
      );
      // this.ballObj.linearVelocity = cc.v2(1, 1);
      this.ballObj.linearVelocity = cc.v2(this.stickObj.x / this.stick.k, this.stickObj.y / this.stick.k);
    }
  }
});
