function init_imgs() {
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
  arr[index].src = './images/' + (parseInt(index) + 1) + '.jpg';
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
  }
}

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
    return false;
  } else if (at_pos < 1 || dot_pos < at_pos + 2 || dot_pos + 2 >= input_emailAddress.length) {
    error_tips.innerText = "Email address type error";
    return false;
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
          document.getElementById("error-tips").innerText = "We send your password to your email";
        } else if (request.responseText == 'f') {
          document.getElementById("error-tips").innerText = "Email hasn't been registered";
        } else if (request.responseText.charAt(request.responseText.length - 1) == 'e') {
          document.getElementById("error-tips").innerText = "Send password error, please try again";
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
  init_imgs();
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