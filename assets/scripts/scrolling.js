cc.Class({
  extends: cc.Component,

  properties: {
    mainObj: {
      default: null,
      type: cc.Node
    },
    cameraObj: {
      default: null,
      type: cc.Node
    }
  },

  update(dt) {
    this.cameraObj.setPosition(cc.v2(this.mainObj.getPosition()));
  }
});
