import Utils from "./Utils.js";
var max, min, mask, imgCon, preImg;
var x = 0;
var y = 0;
var pos = 0;
var iconList;
var bnList = [];
const MASK_WIDTH = 298;
const MIN_WIDTH = 480;
const MAX_WIDTH = 510;
const IMAGE_WIDTH = 88;

// ajax商品请求数据
var search = location.search.slice(1);
ajax("commodity", search);
function ajax(type, data) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", readystateHandler);
  xhr.open("POST", "http://localhost:8000/" + type);
  xhr.send(JSON.stringify(data));
  function readystateHandler(e) {
    if (this.readyState === 4 && this.status === 200) {
      var goodList = JSON.parse(this.response);
      goodList.forEach((item) => {
        iconList = item.src;
        init(item);
      });
    }
  }
}

function init(datas) {
  // 图片放大镜
  var zoom = Utils.ce("div", {
    position: "relative",
  });
  createMin(zoom, datas);
  createMax(zoom, datas);
  createCarousl(zoom, datas);
  var detailss = document.querySelector(".goods-details");
  detailss.appendChild(zoom);

  // 详情右侧信息
  var sInfo = Utils.ce("div", {
    width: "678px",
    float: "right",
    marginTop: "12px",
  });
  createTitle(sInfo, datas);
  createSub(sInfo, datas);
  createContent(sInfo, datas);
  createClass(sInfo, datas);
  // 商品数量
  createNum(sInfo, datas);

  // 积分
  createPoint(sInfo, datas);

  // 立即购买和加入购物车按钮
  createGoods(sInfo, datas);

  detailss.appendChild(sInfo);
}

function createMin(parent, item) {
  min = Utils.ce("div", {
    // 设置初始图片容器
    position: "absolute",
    width: MIN_WIDTH + "px",
    height: MIN_WIDTH + "px",
    background: `url(../imgs/${item.src[0]}) no-repeat`,
    backgroundSize: "100% 100%",
  });
  mask = Utils.ce("div", {
    // 设置放大图片容器的
    position: "absolute",
    width: MASK_WIDTH + "px",
    height: MASK_WIDTH + "px",
    display: "none",
    backgroundColor: "rgba(180,160,0,0.3)",
  });
  min.appendChild(mask);
  parent.appendChild(min);
  min.addEventListener("mouseenter", mouseHandler);
}

function createMax(parent, item) {
  max = Utils.ce("div", {
    // 设置放大容器
    position: "absolute",
    width: MAX_WIDTH + "px",
    height: MAX_WIDTH + "px",
    zIndex: 1000,
    background: `url(../imgs/${item.src[0]})`,
    backgroundColor: "#ffffff",
    backgroundSize: "830px 830px",
    border: "1px solid #808080",
    display: "none",
    left: MIN_WIDTH + 10 + "px",
  });
  parent.appendChild(max);
}

function createCarousl(parent) {
  var div = Utils.ce("div", {
    // 创建轮播图容器
    position: "absolute",
    width: MIN_WIDTH + "px",
    height: IMAGE_WIDTH + "px",
    top: MIN_WIDTH + 30 + "px",
  });
  var left = Utils.ce("div", {
    // 设置轮播图左右按钮
    position: "absolute",
    width: "15px",
    height: "53px",
    top: "13px",
    background: "url(../imgs/left.png)",
    backgroundSize: "100% 100%",
  });
  // 复制标签
  var right = left.cloneNode(false);
  left.style.left = "0px";
  Object.assign(right.style, {
    right: "0px",
    backgroundPositionX: "-78px",
    backgroundPositionY: "0px",
    backgroundImage: "url(../imgs/right.png)",
  });
  bnList.push(left);
  bnList.push(right);
  div.appendChild(left);
  div.appendChild(right);

  var con = Utils.ce("div", {
    position: "absolute",
    width: "440px",
    height: "88px",
    left: "20px",
    overflow: "hidden",
  });
  div.appendChild(con);
  createImageCon(con);
  parent.appendChild(div);
  div.addEventListener("click", clickHandler);
}

function createImageCon(parent) {
  var width =
    iconList.lentgh * IMAGE_WIDTH +
    iconList.length * IMAGE_WIDTH * 2 -
    IMAGE_WIDTH;
  imgCon = Utils.ce("div", {
    //设置轮播图的容器
    position: "absolute",
    width: width + 20 + "px",
    height: "88px",
    left: 0,
    transition: "all 0.5s",
  });
  for (var i = 0; i < iconList.length; i++) {
    var img = Utils.ce("img", {
      width: IMAGE_WIDTH + "px",
      height: IMAGE_WIDTH + "px",
    });
    img.src = `../imgs/${iconList[i]}`;
    if (i === 0) preImg = img;
    imgCon.appendChild(img);
  }
  imgCon.addEventListener("mouseover", iconMouseHandler);
  parent.appendChild(imgCon);
}

function iconMouseHandler(e) {
  if (e.target.nodeName !== "IMG") return;
  if (preImg) {
    preImg.style["border-bottom"] = "2px solid transparent";
  }
  preImg = e.target;
  preImg.style["border-bottom"] = "2px solid #808080";
  // 让初始图和放大图的地址一样
  min.style.background = max.style.background = `url(${e.target.src}) no-repeat`;
  max.style.backgroundSize = "830px 830px";
  max.style.backgroundColor = "#ffffff";
}

function mouseHandler(e) {
  if (e.type === "mouseenter") {
    mask.style.display = max.style.display = "block";
    min.style.border = "1px solid #808080";
    min.addEventListener("mouseleave", mouseHandler);
    min.addEventListener("mousemove", mouseHandler);
  } else if (e.type === "mousemove") {
    move(e.clientX, e.clientY);
  } else if (e.type === "mouseleave") {
    mask.style.display = max.style.display = "none";
    min.style.border = "1px solid transparent";
    min.removeEventListener("mouseleave", mouseHandler);
    min.removeEventListener("mousemove", mouseHandler);
  }
}

function move(mouseX, mouseY) {
  var rect = min.getBoundingClientRect();
  x = mouseX - MASK_WIDTH / 2 - rect.x;
  y = mouseY - MASK_WIDTH / 2 - rect.y;
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > MIN_WIDTH - MASK_WIDTH) x = MIN_WIDTH - MASK_WIDTH;
  if (y > MIN_WIDTH - MASK_WIDTH) y = MIN_WIDTH - MASK_WIDTH;
  mask.style.left = x + "px";
  mask.style.top = y + "px";
  max.style.backgroundPositionX = -x * (MAX_WIDTH / MASK_WIDTH) + "px";
  max.style.backgroundPositionY = -y * (MAX_WIDTH / MASK_WIDTH) + "px";
}

function clickHandler(e) {
  var index = bnList.indexOf(e.target);
  if (index < 0) return;
  if (index === 0) {
    pos--;
    if (pos < 0) pos = 0;
  } else {
    pos++;
    if (pos > Math.floor(iconList.length / 5)) {
      pos = Math.floor(iconList.length / 5);
    }
  }

  if (pos === Math.floor(iconList.length / 5)) {
    imgCon.style.left = -(imgCon.offsetWidth - 352) + "px";
  } else {
    imgCon.style.left = pos * -352 + "px";
  }
}

// 详情右侧信息栏
function createTitle(parent, item) {
  //标题
  var div = Utils.ce("div", {
    width: "678px",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "25px",
  });
  div.textContent = `${item.title}`;
  parent.appendChild(div);
}

function createSub(parent, item) {
  // 小标题和蓝色小链接
  var div = Utils.ce("div", {
    width: "678px",
    height: "40px",
    color: "#f33",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    marginTop: "7px",
  });
  div.textContent = `${item.info}`;
  var a = Utils.ce("a", {
    color: "#2661B2",
    textDecoration: "underline",
    display: "block",
  });
  a.textContent = `${item.link}`;
  div.appendChild(a);
  parent.appendChild(div);
}

function createContent(parent, item) {
  // 价格和促销
  var divCon = Utils.ce("div", {
    width: "678px",
    paddingTop: "15px",
    marginTop: "11px",
    borderTop: "5px solid #f0f0f0",
    background: "#fafafa",
  });
  // 价格
  var price = Utils.ce("div", {
    width: "678px",
    height: "40px",
    lineHeight: "24px",
    padding: "0 20px 8px 15px",
  });
  var label = Utils.ce("div", {
    width: "45px",
    height: "24px",
    color: "#333",
    fontSize: "14px",
    float: "left",
  });
  label.textContent = "价 格";
  var normal = Utils.ce("div", {
    width: "200px",
    height: "28px",
    marginBottom: "4px",
    float: "left",
  });
  var rong = Utils.ce("strong", {
    color: "#fa5437",
    fontWeight: "600",
    float: "left",
    fontSize: "24px",
    marginRight: "5px",
  });
  rong.textContent = `¥${item.price}`;
  var oldi = Utils.ce("i", {
    fontSize: "12px",
    fontStyle: "normal",
    marginRight: "3px",
    textDecoration: "line-through",
  });
  oldi.textContent = `¥${item.oldPrice}`;

  price.appendChild(label);
  normal.appendChild(rong);
  normal.appendChild(oldi);
  price.appendChild(normal);

  // 领券
  var coupons = Utils.ce("div", {
    width: "678px",
    height: "40px",
    lineHeight: "24px",
    padding: "0 20px 16px 15px",
  });
  var label1 = Utils.ce("div", {
    width: "45px",
    height: "24px",
    color: "#333",
    fontSize: "14px",
    float: "left",
  });
  label1.textContent = "领 券";
  var show = Utils.ce("div", {
    width: "110px",
    height: "20px",
    cursor: "pointer",
    marginRight: "6px",
    fontSize: "12px",
    lineHeight: "18px",
    border: "1px solid #f53",
    textAlign: "center",
    marginTop: "3px",
    background: "#FFEBE9",
    color: "#F33",
    float: "left",
  });
  show.textContent = "满99.00减10.00元";
  var show1 = Utils.ce("div", {
    width: "103px",
    height: "20px",
    cursor: "pointer",
    marginRight: "6px",
    fontSize: "12px",
    lineHeight: "18px",
    border: "1px solid #f53",
    textAlign: "center",
    marginTop: "3px",
    background: "#FFEBE9",
    color: "#F33",
    float: "left",
  });
  show1.textContent = "满99.00减5.00元";

  coupons.appendChild(label1);
  coupons.appendChild(show);
  coupons.appendChild(show1);

  divCon.appendChild(price);
  divCon.appendChild(coupons);

  // 促销
  if (item.gift !== "" || item.down !== "") {
    // 没促销数据，就不创建促销板块
    var acti = Utils.ce("div", {
      lineHeight: "24px",
      padding: "0 20px 16px 15px",
      width: "678px",
      height: `${item.gift == "" || item.down == "" ? "30px" : "60px"}`, // 直降和赠品的数据，有一个是空字符串则height高度为30，都不为空则创建60px的高度
    });

    var label2 = Utils.ce("div", {
      width: "45px",
      height: "24px",
      color: "#333",
      fontSize: "14px",
      float: "left",
    });
    label2.textContent = "促 销";
    acti.appendChild(label2);

    if (item.gift !== "") {
      // 赠品数据不为空字符串，则创建赠品
      var tag = Utils.ce("div", {
        width: "40px",
        height: "24px",
        background: "#FFEBE9",
        borderRadius: "15px",
        color: "#F33",
        float: "left",
        fontStyle: "normal",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        padding: "0 8px",
        marginRight: "5px",
      });
      tag.textContent = "赠品";

      var p = Utils.ce("div", {
        width: "548px",
        height: "24px",
        color: "#666",
        fontSize: "14px",
        float: "left",
      });
      p.textContent = `${item.gift}`;
      acti.appendChild(tag);
      acti.appendChild(p);
    }

    if (item.down !== "") {
      // 直降数据不为空字符串，则创建直降
      var tag1 = Utils.ce("div", {
        width: "40px",
        height: "24px",
        background: "#FFEBE9",
        borderRadius: "15px",
        color: "#F33",
        float: "left",
        fontStyle: "normal",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "24px",
        padding: "0 8px",
        marginRight: "5px",
        // marginLeft: "45px",
        marginLeft: "",
        // marginTop: "5px",
      });
      tag1.style.marginLeft = `${item.gift !== "" ? "45px" : 0}`; // 赠品数据不是空字符，则marginLeft 45px
      tag1.style.marginTop = `${item.gift !== "" ? "5px" : 0}`; // 赠品数据不是空字符
      tag1.textContent = "直降";

      var p1 = Utils.ce("div", {
        width: "548px",
        height: "24px",
        color: "#666",
        fontSize: "14px",
        float: "left",
        // marginTop: "5px",
      });
      p1.textContent = `${item.down}`;
      p1.style.marginTop = `${item.gift !== "" ? "5px" : 0}`;

      acti.appendChild(tag1);
      acti.appendChild(p1);
    }

    divCon.appendChild(acti);
  }
  parent.appendChild(divCon);
}

// 分类
function createClass(parent, item) {
  var len = String(item.cla); // 把数据转成字符串
  var cate = Utils.ce("div", {
    width: "678px",
    // height: "44px",
    height: `${len.length > 35 ? "76px" : "38px"}`, // 判断字符串的长度，来判断数据长度，预留分类的高度
    padding: "0 20px 6px 15px",
    marginTop: "15px",
  });

  var label = Utils.ce("span", {
    width: "45px",
    height: "24px",
    fontSize: "14px",
    lineHeight: "24px",
    marginRight: "5px",
    color: "#999999",
    float: "left",
  });
  label.textContent = "分 类";

  var list = Utils.ce("ul", {
    width: "588px",
    height: "38px",
    float: "left",
  });

  for (var i = 0; i < item.cla.length; i++) {
    var tips = Utils.ce("li", {
      borderRadius: "4px",
      border: "1px solid #DDD",
      color: "#333",
      display: "inline-block",
      margin: "0 10px 10px 0",
      height: "26px",
      background: "#fff",
      lineHeight: "26px",
      padding: "0 20px",
      fontSize: "14px",
    });
    tips.textContent = `${item.cla[i]}`;
    list.appendChild(tips);
  }
  // 分类点击到的元素样式
  list.addEventListener("click", tipsClick);
  function tipsClick(e) {
    if (e.target.nodeName == "UL") return;

    var child = this.children;
    for (var a = 0; a < child.length; a++) {
      child[a].style.border = "1px solid #DDD";
      child[a].style.background = "#fff";
    }

    if (e.target) {
      e.target.style.border = "1px solid #f33";
      e.target.style.background = "#FFEBE9";
    }
  }

  cate.appendChild(label);
  cate.appendChild(list);

  parent.appendChild(cate);
}
// 商品数量
function createNum(parent, item) {
  var numBox = Utils.ce("div", {
    width: "678px",
    height: "44px",
    padding: "0 26px 16px 15px",
  });

  var num = Utils.ce("span", {
    width: "45px",
    height: "24px",
    color: "#999",
    fontSize: "14px",
    lineHeight: "24px",
    display: "inline-block",
    marginRight: "5px",
    float: "left",
  });
  num.textContent = "数 量";
  numBox.appendChild(num);

  var div = Utils.ce("div", {
    //加减容器
    width: "92px",
    height: "28px",
    float: "left",
    position: "relative",
  });
  createBnList(div);
  createInput(div);
  numBox.appendChild(div);

  parent.appendChild(numBox);
}

var ids, input;
var step = 1;
// 加减点击按钮
function createBnList(parent) {
  var leftBn = Utils.ce("div", {
    width: "26px",
    height: "26px",
    textAlign: "center",
    border: "1px solid #ddd",
    position: "absolute",
    background: "#f6f6f6",
    cursor: "pointer",
  });
  var rightBn = leftBn.cloneNode(false);
  (leftBn.style.left = "0px"),
    (rightBn.style.right = "0px"),
    (leftBn.textContent = "-");
  rightBn.textContent = "+";
  parent.appendChild(leftBn);
  parent.appendChild(rightBn);
  leftBn.addEventListener("mousedown", bnMouseHandler);
  rightBn.addEventListener("mousedown", bnMouseHandler);
  leftBn.addEventListener("click", bnclickHandler);
  rightBn.addEventListener("click", bnclickHandler);
}

// 加减inpu输入
function createInput(parent) {
  input = Utils.ce("input", {
    width: "40px",
    height: "26px",
    position: "absolute",
    left: "26px",
    border: "none",
    textAlign: "center",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
  });
  input.value = "1";
  parent.appendChild(input);
  input.addEventListener("input", inputHandler);
}

function bnMouseHandler(e) {
  e.preventDefault();
}

function inputHandler(e) {
  // 限制输入非数字
  this.value = this.value.replace(/\D/g, "");

  //节流
  if (ids) return;
  ids = setTimeout(
    function (input) {
      clearTimeout(ids);
      ids = 0;
      setStep(input.value);
    },
    500,
    this
  );
}

function bnclickHandler(e) {
  if (this.textContent === "-") {
    setStep(step - 1);
  } else {
    setStep(step + 1);
  }
}

function setStep(value) {
  value = Number(value);
  if (value < 1) value = 1;
  if (value > 999) value = 999;
  step = value;
  input.value = step;
}

// 积分
function createPoint(parent, item) {
  var box = Utils.ce("div", {
    width: "678px",
    height: "44px",
    padding: "0px 20px 16px 15px",
  });

  var span = Utils.ce("span", {
    width: "45px",
    height: "24px",
    lineHeight: "24px",
    color: "#999",
    marginRight: "5px",
    fontSize: "14px",
    float: "left",
  });
  span.textContent = "积 分";
  box.appendChild(span);

  var content = Utils.ce("div", {
    width: "588px",
    height: "24px",
    lineHeight: "24px",
    float: "left",
    fontSize: "14px",
    color: "#333333",
  });
  var price = Math.floor(item.price); // 积分是1元一积分避免小数点积分
  content.textContent = `购买可获得${price}积分`;
  box.appendChild(content);

  parent.appendChild(box);
}

// 立即购买和添加到购物车
function createGoods(parent, item) {
  var box = Utils.ce("div", {
    width: "444px",
    height: "40px",
  });

  var buy = Utils.ce("a", {
    width: "202px",
    height: "40px",
    lineHeight: "38px",
    display: "inline-block",
    textAlign: "center",
    fontSize: "20px",
    marginRight: "16px",
    borderRadius: "6px",
    float: "left",
  });
  var cart = buy.cloneNode(false);
  buy.style.background = "#ffebe9";
  buy.style.border = "1px solid #f33";
  buy.style.color = "#f33";
  buy.href = "javascript:;";
  buy.textContent = "立即购买";

  cart.style.background = "linear-gradient(180deg,#F33 0,#F63 100%)";
  cart.style.color = "#fff";
  cart.style.border = "1px solid transparent";
  cart.href = "javascript:;";
  cart.textContent = "加入购物车";

  box.appendChild(buy);
  box.appendChild(cart);

  parent.appendChild(box);
}
