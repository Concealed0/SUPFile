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
    var input_emailAddress = document.forms['login-form'].emailAddress.value;
    var input_password = document.forms['login-form'].password.value;
    ajax({
      method: "POST",
      url: "login.php",
      async: true,
      data: {
        loginEmailAddress: input_emailAddress,
        loginPassword: input_password
      },
      success: function (response_text) {
        document.getElementById("submit-btn").value = 'Login';
        if (response_text == 's') {
          window.location.href = "../SUPFile/personal-SUPFile.html";
        } else if (response_text == 'f') {
          document.getElementById("error-tips").innerText = "Email address or Password is wrong";
        } else {
          alert(response_text);
        }
      }
    });
  } else {
    document.getElementById("submit-btn").value = 'Login';
  }
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
    ajax({
      method: "POST",
      url: "sendIdCode.php",
      async: true,
      data: {
        forgetInputEmailAddress: input_emailAddress
      },
      success: function (response_text) {
        if (response_text.charAt(response_text.length - 1) == 's') {
          error_tips.innerText = "We send your password to your email";
        } else if (response_text == 'f') {
          error_tips.innerText = "Email hasn't been registered";
        } else if (response_text.charAt(response_text.length - 1) == 'e') {
          error_tips.innerText = "Send password error, please try again";
        } else {
          alert(response_text);
        }
      }
    });
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
  play_pic({
    div: document.getElementById("index-banner"),
    dots: document.getElementsByClassName("focus-anchor"),
    dirs: ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg'],
    index: 0
  });
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