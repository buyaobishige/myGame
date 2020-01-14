cc.Class({
  extends: cc.Component,

  properties: {
    stick: {
      default: null,
      type: cc.Node
    },
    maxR: 150
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.stick.on(cc.Node.EventType.TOUCH_MOVE, this.onStickMove, this);
    this.stick.on(cc.Node.EventType.TOUCH_END, this.onStickEnd, this);
    this.stick.on(
      cc.Node.EventType.TOUCH_CANCEL,
      () => {
        this.onStickEnd();
      },
      this
    );
  },

  onStickMove(e) {
    let screenPos = e.getLocation();
    let relativePos = this.stick.convertToNodeSpaceAR(screenPos);
    let x = relativePos.x;
    let y = relativePos.y;
    //暴露给move.js
    this.x = x;
    this.y = y;
    //=====
    let maxR = this.maxR;
    if (x * x + y * y <= maxR * maxR) {
      this.stick.setPosition(relativePos);
    } else {
      let k = Math.sqrt((x * x + y * y) / (maxR * maxR));
      this.stick.setPosition(cc.v2(x / k, y / k));
    }
  },

  onStickEnd() {
    this.stick.setPosition(cc.v2(0, 0));
  }
});
