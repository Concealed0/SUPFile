function validateForm() {
  var flag = true;
  var email_address = document.forms["login-form"]["emailAddress"].value;
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
  var password = document.forms["login-form"]["password"].value;
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

var img0 = new Image();
img0.src = "./images/1.jpg";
img0.load = function () {
  document.getElementById("index-banner").style.backgroundImage = 'url("./images/1.jpg")';
};
var img1 = new Image();
img1.src = "./images/2.jpg";
img1.load = function () {
  document.getElementById("index-banner").style.backgroundImage = 'url("./images/2.jpg")';
};
var img2 = new Image();
img2.src = "./images/3.jpg";
img2.load = function () {
  document.getElementById("index-banner").style.backgroundImage = 'url("./images/3.jpg")';
};
var img3 = new Image();
img3.src = "./images/4.jpg";
img3.load = function () {
  document.getElementById("index-banner").style.backgroundImage = 'url("./images/4.jpg")';
};

var pic_arr = [img0, img1, img2, img3];
var index = 1;

window.onload = function () {
  pic_arr[0].load();
  document.getElementsByClassName("focus-anchor")[0].style.opacity = "1";
  for (var i=0; i<4; i++) {
    document.getElementsByClassName("focus-anchor")[i].onmouseup = function(event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      index = obj.id;
      pic_arr[index].load();
      document.getElementsByClassName("focus-anchor")[index].style.opacity = "1";
      for (var i=0; i<4; i++) {
        if (i != index) {
          document.getElementsByClassName("focus-anchor")[i].style.opacity = ".5";
        }
      }
    };
  }
  setInterval(function () {
    pic_arr[index].load();
    document.getElementsByClassName("focus-anchor")[index].style.opacity = "1";
    for (var i=0; i<4; i++) {
      if (i != index) {
        document.getElementsByClassName("focus-anchor")[i].style.opacity = ".5";
      }
    }
    if (index < 3) {
      index++;
    } else {
      index = 0;
    }
  }, 2000);
};