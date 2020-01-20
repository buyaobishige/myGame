// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    intro: { default: "这是一件商品。", type: cc.String },
    price: { default: 0, type: cc.Float },
    itemName: { default: "", type: cc.String },
    img: { default: null, type: cc.SpriteFrame },
    introBox: { default: null, type: cc.Label },
    priceBox: { default: null, type: cc.Label },
    imgBox: { default: null, type: cc.Node },
    nameBox: { default: null, type: cc.Label }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // this.introBox.string = "        " + this.intro;
    // this.priceBox.string = this.price;
    // this.nameBox.string = this.itemName;
    // this.introBox.SpriteFrame = this.img;
  }

  // start() {}

  // update (dt) {},
});
