function check_form_values() {
  var input_emailAddress = document.forms['login-form'].emailAddress.value;
  var error_tips = document.getElementById("error-tips");
  if (input_emailAddress == null || input_emailAddress == '') {
    error_tips.innerText = "Email address can't be empty";
    return false;
  }
  var at_pos = input_emailAddress.indexOf("@");
  var dot_pos = input_emailAddress.lastIndexOf(".");
  if (at_pos < 1 || dot_pos < at_pos + 2 || dot_pos + 2 >= input_emailAddress.length) {
    error_tips.innerText = "Email address type error";
    return false;
  }
  var input_password = document.forms['login-form'].password.value;
  if (input_password.length == 0) {
    error_tips.innerText = "Password can't be empty";
    return false;
  } else if (input_password.length > 18 || input_password < 6) {
    error_tips.innerText = "Password length: 6 ~ 18";
    return false;
  }
  return true;
}

function click_submitBtn() {
  document.getElementById("submit-btn").value = 'Login...';
  if (check_form_values()) {
    check_email_and_pwd();
  } else {
    document.getElementById("submit-btn").value = 'Login';
  }
}

function check_email_and_pwd() {
  var input_emailAddress = document.forms['login-form'].emailAddress.value;
  var input_password = document.forms['login-form'].password.value;
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open("POST", "login.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("loginEmailAddress=" + input_emailAddress + "&loginPassword=" + input_password);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      document.getElementById("submit-btn").value = 'Login';
      if (request.responseText == 's') {
        window.location.href = "../SUPFile/personal-SUPFile.html";
      } else if (request.responseText == 'f') {
        document.getElementById("error-tips").innerText = "Email address or Password is wrong";
      } else {
        alert(request.responseText);
      }
    }
  };
}

function click_forgetBtn() {
  var input_emailAddress = document.forms['login-form'].emailAddress.value;
  var error_tips = document.getElementById("error-tips");
  var at_pos = input_emailAddress.indexOf("@");
  var dot_pos = input_emailAddress.lastIndexOf(".");
  if (input_emailAddress == null || input_emailAddress == '') {
    error_tips.innerText = "Email address can't be empty";
  } else if (at_pos < 1 || dot_pos < at_pos + 2 || dot_pos + 2 >= input_emailAddress.length) {
    error_tips.innerText = "Email address type error";
  } else {
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open("POST", "sendIdCode.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("forgetInputEmailAddress=" + input_emailAddress);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        if (request.responseText.charAt(request.responseText.length - 1) == 's') {
          error_tips.innerText = "We send your password to your email";
        } else if (request.responseText == 'f') {
          error_tips.innerText = "Email hasn't been registered";
        } else if (request.responseText.charAt(request.responseText.length - 1) == 'e') {
          error_tips.innerText = "Send password error, please try again";
        } else {
          alert(request.responseText);
        }
      }
    };
  }
}

window.onload = function () {
  if (this.document.documentElement.clientWidth >= 1400) {
    document.getElementById("login-container").style.height = "720px";
    document.getElementById("index-banner").style.height = "720px";
    this.document.getElementById('foot').style.marginTop = "750px";
  }
  this.document.getElementById("submit-btn").addEventListener('click', click_submitBtn);
  this.document.getElementById("forget-btn").addEventListener('click', click_forgetBtn);
  var background_player = new background_loading(document.getElementById("index-banner"), document.getElementsByClassName("focus-anchor"));
  background_player._init();
};

function background_loading(div, dots) {
  this.div = div;
  this.dots = dots;
}

background_loading.prototype._init = function () {
  this.url = './images/';
  this.arr = [];
  this.index = 0;
  this.timer = null;
  this.play_timer = null;
  this._init_events();
  for (var i = 0; i < 4; i++) {
    this.dots[i].addEventListener('mouseup', mouse_up, false);
  }
  var _this = this;
  function mouse_up(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    _this.index = obj.id;
    for (var i = 0; i < 4; i++) {
      if (i != _this.index) {
        _this.dots[i].style.opacity = 0.5;
      } else {
        _this.dots[i].style.opacity = 1;
      }
    }
    clearTimeout(_this.timer);
    _this._init_events();
  }
};

background_loading.prototype._init_events = function () {
  if (this.arr[this.index] == null) {
    this._init_image();
  }

  this.dots[this.index].style.opacity = 1;
  this.arr[this.index].load();
  this.div.style.opacity = 1;

  var _this = this;
  this.timer = setTimeout(set_timer, 5000);
  function set_timer() {
    _this.index++;
    if (_this.index >= 4) {
      _this.index = 0;
    }
    if (_this.arr[_this.index] == null) {
      _this._init_image();
    }
    _this.div.style.opacity = 0.001;
    clearTimeout(_this.play_timer);
    clearTimeout(_this.timer);
    _this.play_timer = setTimeout(play_image_and_dots, 1000);
    _this.timer = setTimeout(set_timer, 5000);
  }

  function play_image_and_dots() {
    _this.arr[_this.index].load();
    _this.div.style.opacity = 1;
    _this.dots[_this.index].style.opacity = 1;
    for (var i = 0; i < 4; i++) {
      if (i != _this.index) {
        _this.dots[i].style.opacity = 0.5;
      } else {
        _this.dots[i].style.opacity = 1;
      }
    }
  }
};

background_loading.prototype._init_image = function () {
  var div = this.div;
  this.arr[this.index] = new Image();
  this.arr[this.index].src = './images/' + (parseInt(this.index) + 1) + '.jpg';
  this.arr[this.index].load = function () {
    div.style.backgroundImage = 'url(' + this.src + ')';
  };
};

window.onresize = function () {
  if (this.document.documentElement.clientWidth >= 1400) {
    document.getElementById("login-container").style.height = "720px";
    document.getElementById("index-banner").style.height = "720px";
    document.getElementById('foot').style.marginTop = "750px";
  } else {
    document.getElementById("login-container").style.height = "550px";
    document.getElementById("index-banner").style.height = "550px";
    document.getElementById('foot').style.marginTop = "600px";
  }
};