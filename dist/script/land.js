init();
function init() {
  user = document.querySelector("#username");
  pass = document.querySelector("#password");

  user.addEventListener("input", userInputHandler);
  pass.addEventListener("input", passInputHandler);

  userdiv = document.querySelector("#userdiv");
  passdiv = document.querySelector("#passdiv");

  submit = document.querySelector("#submit");
  submit.addEventListener("click", submitclickHandler);
}

var bool = false;
function userInputHandler(e) {
  if (bool) return;
  var ids = setTimeout(function () {
    clearTimeout(ids);
    bool = false;
  }, 200);
  bool = true;

  var userReg = /^1[0-9]{10}$/;
  if (userReg.test(user.value)) {
    userdiv.removeAttribute("class");
    userdiv.setAttribute("class", "usersucc");
  } else {
    userdiv.removeAttribute("class");
    userdiv.setAttribute("class", "usererror");
  }
}

function passInputHandler(e) {
  if (bool) return;
  var ids = setTimeout(function () {
    clearTimeout(ids);
    bool = false;
  }, 200);
  bool = true;

  var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
  if (passReg.test(pass.value)) {
    passdiv.removeAttribute("class");
    passdiv.setAttribute("class", "passsucc");
  } else {
    passdiv.removeAttribute("class");
    passdiv.setAttribute("class", "passerror");
  }
}

function submitclickHandler(e) {
    console.log(user.value,pass.value)
  ajax("singnIn", { user: user.value, password: pass.value });
}

function ajax(type, data) {
  var xhr =new XMLHttpRequest();
  xhr.addEventListener("readystatechange", readystateHandler);
  xhr.open("POST", "http://localhost:8000/" + type);
  xhr.send(JSON.stringify(data));

  function readystateHandler(e) {
    if (this.readyState === 4 && this.status === 200) {
      if (this.response === "登陆成功") {
        alert("登陆成功");
        window.location.href = "./index.html";
      } else {
        alert("用户名或密码错误，请重新输入");
      }
    }
  }
}
