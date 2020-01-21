cc.Class({
  extends: cc.Component,

  properties: {
    itemName: { default: null, type: cc.Label },
    intro: { default: null, type: cc.Label },
    price: { default: null, type: cc.Label },
    img: { default: null, type: cc.Node },
    buybtn: { default: null, type: cc.Node },
    buybtnsensor: { default: null, type: cc.Node },
    hasOwned: { default: null, type: cc.Label }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // cc.log("1" + JSON.stringify(window.thingsInListArray));
    let item;
    if (window.thingsInListCategory == "食物") {
      item = window.thingsInListArray.food.pop();
    } else if (window.thingsInListCategory == "文具") {
      item = window.thingsInListArray.stationery.pop();
    } else if (window.thingsInListCategory == "典籍") {
      item = window.thingsInListArray.book.pop();
    }
    // cc.log("2" + JSON.stringify(window.thingsInListArray));
    this.itemName.string = item.itemName;
    this.intro.string = "        " + item.intro;
    this.price.string = String(item.price);
    window.theJSONOfAllItems.map(obj => {
      if (obj.itemName == item.itemName) {
        this.hasOwned.string = "已拥有：" + String(obj.quantity);
      }
    });

    let imgnode = this.img;
    cc.loader.loadRes(item.img, cc.SpriteFrame, function(err, spriteFrame) {
      var node = new cc.Node("New Sprite");
      var sprite = node.addComponent(cc.Sprite);
      sprite.spriteFrame = spriteFrame;
      node.height = 150;
      node.width = 150;
      node.parent = imgnode;
    });
    // cc.log("3" + JSON.stringify(window.thingsInListArray));

    this.buybtnsensor.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        let action1 = cc.scaleTo(0.1, 1.5);
        let action2 = cc.scaleTo(0.05, 1);
        this.buybtn.runAction(cc.sequence(action1, action2));

        if (window.theMoneyOfPlayer >= Number(item.price)) {
          window.theMoneyOfPlayer -= Number(item.price);
          cc.log(window.theJSONOfAllItems);
          window.theJSONOfAllItems.map(obj => {
            if (obj.itemName == item.itemName) {
              obj.quantity += 1;
              this.hasOwned.string = "已拥有：" + String(obj.quantity);
            }
          });
        }
        cc.sys.localStorage.setItem(
          "itemList",
          JSON.stringify(window.theJSONOfAllItems)
        );
        cc.sys.localStorage.setItem(
          "theMoneyOfPlayer",
          window.theMoneyOfPlayer
        );

        // cc.log("buybtn");
        // cc.log(window.theMoneyOfPlayer);
      },
      this
    );
  }
});
