cc.Class({
  extends: cc.Component,

  properties: {
    dataJSON: {
      default: null,
      type: cc.JsonAsset
    },
    necessaryItems: "",
    cardItem: {
      default: null,
      type: cc.Prefab
    },
    foodbtn: {
      default: null,
      type: cc.Node
    },
    stationerybtn: {
      default: null,
      type: cc.Node
    },
    bookbtn: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:
  init() {
    let json = this.dataJSON.json;
    if (!window.theJSONOfAllItems) {
      cc.log(cc.sys.localStorage.getItem("itemList"));
      if (cc.sys.localStorage.getItem("itemList")) {
        window.theJSONOfAllItems = JSON.parse(
          cc.sys.localStorage.getItem("itemList")
        );
      } else {
        window.theJSONOfAllItems = json;
        cc.sys.localStorage.setItem("itemList", JSON.stringify(json));
      }
    }
    let necessaryItemsArray = this.necessaryItems.split(" ");
    let thingsInListArray = { food: [], stationery: [], book: [] };
    json.map(item => {
      if (
        necessaryItemsArray.includes(item.itemName) &&
        item.category == "食物"
      ) {
        thingsInListArray.food.push(item);
      } else if (
        necessaryItemsArray.includes(item.itemName) &&
        item.category == "文具"
      ) {
        thingsInListArray.stationery.push(item);
      } else if (
        necessaryItemsArray.includes(item.itemName) &&
        item.category == "典籍"
      ) {
        thingsInListArray.book.push(item);
      }
    });
    window.thingsInListArray = thingsInListArray;

    if (!window.thingsInListCategory) {
      window.thingsInListCategory = "食物";
    }

    let N;
    if (window.thingsInListCategory == "食物") {
      N = window.thingsInListArray.food.length;
    } else if (window.thingsInListCategory == "文具") {
      N = window.thingsInListArray.stationery.length;
    } else if (window.thingsInListCategory == "典籍") {
      N = window.thingsInListArray.book.length;
      // cc.log(JSON.stringify(window.thingsInListArray));
      // cc.log(N);
    }
    this.loadCards(N);
  },
  onLoad() {
    //金钱重置为1000
    if (!window.theMoneyOfPlayer) {
      if (
        cc.sys.localStorage.getItem("theMoneyOfPlayer") != null &&
        (cc.sys.localStorage.getItem("theMoneyOfPlayer") != null) != undefined
      ) {
        window.theMoneyOfPlayer = cc.sys.localStorage.getItem(
          "theMoneyOfPlayer"
        );
        // cc.log(cc.sys.localStorage);
      } else {
        window.theMoneyOfPlayer = 90000;
        cc.sys.localStorage.setItem("theMoneyOfPlayer", 90000);
      }
    }

    //------------

    this.init();
    this.foodbtn.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        cc.log("foodbtn");
        window.thingsInListCategory = "食物";
        this.init();
      },
      this
    );
    this.stationerybtn.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        cc.log("stationerybtn");
        window.thingsInListCategory = "文具";
        this.init();
      },
      this
    );
    this.bookbtn.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        cc.log("bookbtn");
        window.thingsInListCategory = "典籍";
        this.init();
      },
      this
    );
  },
  loadCards(n) {
    this.node.removeAllChildren(true);
    //被参考的第一个card的相对位置
    let x0 = 737;
    let x1 = 230;
    let y0 = -178;
    let y0copy = -178;
    let offsety = 318;
    //=======
    let i = 0;
    this.node.height = n % 2 == 0 ? 0.5 * n * 350 : (n + 1) * 0.5 * 350;

    let nodeArray = [];
    // cc.log(n);
    while (i < n) {
      let node = cc.instantiate(this.cardItem);
      nodeArray.push(node);
      i++;
    }
    // cc.log(i);
    let j = 0;
    while (j < n) {
      nodeArray[j].x = x1;
      nodeArray[j].y = y0;
      nodeArray[j].parent = this.node;
      y0 -= offsety;
      j += 2;
    }
    let w = 1;
    while (w < n) {
      nodeArray[w].x = x0;
      nodeArray[w].y = y0copy;
      nodeArray[w].parent = this.node;
      y0copy -= offsety;
      w += 2;
    }
  }
  // update (dt) {},
});
