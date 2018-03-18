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
  var index_banner = document.getElementById("index-banner");
  var img0 = new Image();
  img0.src = "./images/1.jpg";
  img0.load = function () {
    index_banner.style.backgroundImage = 'url("./images/1.jpg")';
  };
  var img1 = new Image();
  img1.src = "./images/2.jpg";
  img1.load = function () {
    index_banner.style.backgroundImage = 'url("./images/2.jpg")';
  };
  var img2 = new Image();
  img2.src = "./images/3.jpg";
  img2.load = function () {
    index_banner.style.backgroundImage = 'url("./images/3.jpg")';
  };
  var img3 = new Image();
  img3.src = "./images/4.jpg";
  img3.load = function () {
    index_banner.style.backgroundImage = 'url("./images/4.jpg")';
  };
  var pic_arr = [img0, img1, img2, img3];
  var index = 0;
  var dots = document.getElementsByClassName("focus-anchor");
  var timer = null;
  dots[0].style.opacity = 1;

  for (var i = 0; i < 4; i++) {
    dots[i].addEventListener('mouseup', mouse_up, false);
  }

  pic_arr[index].load();
  index_banner.style.opacity = 1;
  dots[index].style.opacity = 1;
  index++;

  timer = setInterval(function () {
    if (index >= pic_arr.length) {
      index = 0;
    }
    index_banner.style.opacity = 0.001;
    setTimeout(function () {
      pic_arr[index].load();
      index_banner.style.opacity = 1;
      dots[index].style.opacity = 1;
      if (index == 0) {
        dots[3].style.opacity = 0.5;
      } else {
        dots[index - 1].style.opacity = 0.5;
      }
      index++;
    }, 1000);
  }, 5000);

  function mouse_up(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    index = obj.id;

    clearInterval(timer);
    pic_arr[index].load();
    index_banner.style.opacity = 1;
    dots[index].style.opacity = 1;
    for (var i = 0; i < 4; i++) {
      if (i != index) {
        dots[i].style.opacity = 0.5;
      }
    }
    index++;
    timer = setInterval(function () {
      if (index >= pic_arr.length) {
        index = 0;
      }
      index_banner.style.opacity = 0.001;
      setTimeout(function () {
        pic_arr[index].load();
        index_banner.style.opacity = 1;
        dots[index].style.opacity = 1;
        if (index == 0) {
          dots[3].style.opacity = 0.5;
        } else {
          dots[index - 1].style.opacity = 0.5;
        }
        index++;
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