cc.Class({
  extends: cc.Component,

  properties: {
    cardItem: {
      default: null,
      type: cc.Prefab
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //被参考的第一个card的相对位置
    let x0 = 737;
    let x1 = 230;
    let y0 = -178;
    let y0copy = -178;
    let offsety = 318;
    //=======
    let i = 0;
    let n = 10;
    // console.log(this.node);
    this.node.height = n % 2 == 0 ? 0.5 * n * 350 : (n + 1) * 0.5 * 350;

    let nodeArray = [];
    while (i < n) {
      let node = cc.instantiate(this.cardItem);
      nodeArray.push(node);
      i++;
    }
    console.log(nodeArray);
    let j = 0;
    // console.log(nodeArray[j]);
    while (j < n) {
      // console.log(nodeArray[j]);
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
    console.log(this.node._children);
  },

  start() {}

  // update (dt) {},
});
