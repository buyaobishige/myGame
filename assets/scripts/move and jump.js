cc.Class({
  extends: cc.Component,

  properties: {
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    accel: 0
  },

  setJumpAction() {
    let jumpUp = cc
      .moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))
      .easing(cc.easeCubicActionIn());
    let jumpDown = cc
      .moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight))
      .easing(cc.easeCubicActionIn());
    return cc.repeatForever(cc.sequence([jumpUp, jumpDown]));
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.jumpAction = this.setJumpAction();
    this.node.runAction(this.jumpAction);

    // 加速度方向开关
    this.accLeft = false;
    this.accRight = false;
    // 主角当前水平方向速度
    this.xSpeed = 0;

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onKeyDown(e) {
    switch (e.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;
      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp(e) {
    switch (e.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },

  onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  update(dt) {
    /*
     * @dt 每一帧的时间
     */
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }
    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = (this.maxMoveSpeed * this.xSpeed) / Math.abs(this.xSpeed);
    }
    this.node.x += this.xSpeed * dt;
  }
  // update (dt) {},
});
