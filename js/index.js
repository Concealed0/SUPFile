function validateForm() {
  var flag = true;
  var email_address = document.forms["login-form"].emailAddress.value;
  var email_warn = document.getElementById("email-warning");
  var at_pos = email_address.indexOf("@");
  var dot_pos = email_address.lastIndexOf(".");
  if (at_pos < 1 || dot_pos < at_pos + 2 || dot_pos + 2 >= email_address.length) {
    //alert("Please input an email address!");
    //email_warn.innerText = "This isn't an email";
    email_warn.style.display = "block";
    //return false;
    flag = false;
  } else {
    email_warn.style.display = "none";
  }
  var password = document.forms["login-form"].password.value;
  var pwd_warn = document.getElementById("pwd-warning");
  if (password == null || password === "") {
    //alert("Please input password!");
    //pwd_warn.innerText = "can't be empty";
    pwd_warn.style.display = "block";
    //return false;
    flag = false;
  } else {
    pwd_warn.style.display = "none";
  }
  return flag;
}

window.onload = function () {
  if (this.document.documentElement.clientWidth >= 1400) {
    document.getElementById("login-container").style.height = "720px";
    document.getElementById("index-banner").style.height = "720px";
  }
  var div = document.getElementById("index-banner");
  var dots = document.getElementsByClassName("focus-anchor");
  var url = './images/';
  var arr = [];
  var index = 0;
  var timer = null;

  for (var i = 0; i < 4; i++) {
    dots[i].addEventListener('mouseup', mouse_up, false);
  }

  arr[index] = new Image();
  arr[index].src = './images/' + (index + 1) + '.jpg';
  arr[index].load = function () {
    div.style.backgroundImage = 'url(' + this.src + ')';
  };
  dots[index].style.opacity = 1;
  arr[index].load();
  div.style.opacity = 1;

  timer = setInterval(function () {
    index++;
    if (index >= 4) {
      index = 0;
    }
    if (arr[index] == null) {
      arr[index] = new Image();
      arr[index].src = './images/' + (parseInt(index) + 1) + '.jpg';
      arr[index].load = function () {
        div.style.backgroundImage = 'url(' + this.src + ')';
      };
    }
    div.style.opacity = 0.001;
    setTimeout(function () {
      arr[index].load();
      div.style.opacity = 1;
      dots[index].style.opacity = 1;
      if (index == 0) {
        dots[3].style.opacity = 0.5;
      } else {
        dots[index - 1].style.opacity = 0.5;
      }
    }, 1000);
  }, 5000);

  function mouse_up(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    index = obj.id;

    clearTimeout();
    clearInterval(timer);
    if (arr[index] == null) {
      arr[index] = new Image();
      arr[index].src = './images/' + (parseInt(index) + 1) + '.jpg';
      arr[index].load = function () {
        div.style.backgroundImage = 'url(' + this.src + ')';
      };
    }
    arr[index].load();
    div.style.opacity = 1;
    for (var i = 0; i < 4; i++) {
      if (i != index) {
        dots[i].style.opacity = 0.5;
      } else {
        dots[i].style.opacity = 1;
      }
    }

    timer = setInterval(function () {
      index++;
      if (index >= 4) {
        index = 0;
      }
      if (arr[index] == null) {
        arr[index] = new Image();
        arr[index].src = './images/' + (index + 1) + '.jpg';
        arr[index].load = function () {
          div.style.backgroundImage = 'url(' + this.src + ')';
        };
      }
      div.style.opacity = 0.001;
      setTimeout(function () {
        arr[index].load();
        div.style.opacity = 1;
        dots[index].style.opacity = 1;
        if (index == 0) {
          dots[3].style.opacity = 0.5;
        } else {
          dots[index - 1].style.opacity = 0.5;
        }
      }, 1000);
    }, 5000);
  }
};

window.onresize = function () {
  if (this.document.documentElement.clientWidth >= 1400) {
    document.getElementById("login-container").style.height = "720px";
    document.getElementById("index-banner").style.height = "720px";
  } else {
    document.getElementById("login-container").style.height = "550px";
    document.getElementById("index-banner").style.height = "550px";
  }
};