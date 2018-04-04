function click_submit_btn() {
  if (test_form_values_type()) {
    check_idCode_and_emailAddress_is_edited();
  }
}

function check_idCode_and_emailAddress_is_edited() {
  var input_emailAddress = document.forms['register-form'].emailAddress.value;
  var input_password = document.forms['register-form'].password.value;
  var input_idCode = document.forms['register-form'].idCode.value;
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open("POST", "checkEmailIsEdited.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("emailAddress=" + input_emailAddress + "&inputIdCode=" + input_idCode + "&inputPassword=" + input_password);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText == 'e') {
        var idCode_tip = document.getElementById("idCode-error");
        idCode_tip.innerText = "Security code error";
        idCode_tip.style.color = '#fc4343';
        idCode_tip.style.display = 'block';
      } else if (request.responseText == 'c') {
        var emailAddress_tip = document.getElementById("emailAddress-error");
        emailAddress_tip.innerText = "Email address error";
        emailAddress_tip.style.color = '#fc4343';
        emailAddress_tip.style.display = 'block';
      } else if (request.responseText == 's') {
        alert("Register Success!");
        window.location.href = "../SUPFile/index.html";
      } else {
        alert("Error: " + request.responseText);
      }
    }
  };
}

function click_idCode_get_btn() {
  if (test_form_values_type()) {
    check_emailAddress_is_registered();
  }
}

function test_form_values_type() {
  var input_emailAddress = document.forms['register-form'].emailAddress.value;
  var input_password = document.forms['register-form'].password.value;
  var at_pos = input_emailAddress.indexOf("@");
  var dot_pos = input_emailAddress.lastIndexOf(".");
  var emailAddress_tip = document.getElementById("emailAddress-error");
  var password_tip = document.getElementById("password-error");

  if (input_emailAddress == null || input_emailAddress == '') {
    emailAddress_tip.innerText = "Can't be empty";
    emailAddress_tip.style.color = '#fc4343';
    emailAddress_tip.style.display = 'block';
    return false;
  }
  if (at_pos < 1 || dot_pos < at_pos + 2 || dot_pos + 2 >= input_emailAddress.length) {
    emailAddress_tip.innerText = "Address type error";
    emailAddress_tip.style.color = '#fc4343';
    emailAddress_tip.style.display = 'block';
    return false;
  }
  if (input_password == null || input_password == '') {
    password_tip.innerText = "Can't be empty";
    password_tip.style.color = '#fc4343';
    password_tip.style.display = 'block';
    return false;
  }
  if (input_password.length > 18) {
    password_tip.innerText = "Length should < 19";
    password_tip.style.color = '#fc4343';
    password_tip.style.display = 'block';
    return false;
  }
  if (input_password.length < 6) {
    password_tip.innerText = "Length should > 5";
    password_tip.style.color = '#fc4343';
    password_tip.style.display = 'block';
    return false;
  }
  return true;
}

function check_emailAddress_is_registered() {
  var input_emailAddress = document.forms['register-form'].emailAddress.value;
  var request;
  if (window.XMLHttpRequest) { //  IE7+, Firefox, Chrome, Opera, Safari
    request = new XMLHttpRequest();
  } else { // IE6, IE5
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open("POST", "checkEmailIsRegistered.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("emailAddress=" + input_emailAddress);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var r = request.responseText;
      if (r == 'true') {
        var emailAddress_tip = document.getElementById("emailAddress-error");
        emailAddress_tip.innerText = "Email hes been registered";
        emailAddress_tip.style.color = '#fc4343';
        emailAddress_tip.style.display = 'block';
      } else {
        var idCode_tip = document.getElementById("idCode-error");
        if (r.charAt(r.length - 1) == "1") {
          idCode_tip.innerText = "Send security code success";
          idCode_tip.style.color = '#999';
          idCode_tip.style.display = 'block';
        } else if (r.charAt(r.length - 1) == "0") {
          idCode_tip.innerText = "Send security code error";
          idCode_tip.style.color = '#fc4343';
          idCode_tip.style.display = 'block';
        }
      }
    }
  };
}

function init_tips() {
  var emailAddress_tip = document.getElementById("emailAddress-error");
  var emailAddress_input = document.getElementById("register-form-emailAddress");
  var password_tip = document.getElementById("password-error");
  var password_input = document.getElementById("register-form-password");
  var idCode_tip = document.getElementById("idCode-error");
  var idCode_input = document.getElementById("register-form-idCode");
  var idCode_get_btn = this.document.getElementById("idCode-get-btn");
  var submit_btn = this.document.getElementById("submit-btn");
  emailAddress_input.addEventListener('click', function () {
    emailAddress_tip.innerText = "Avaliable email address";
    emailAddress_tip.style.color = '#999';
    emailAddress_tip.style.display = 'block';
  }, true);
  password_input.addEventListener('click', function () {
    password_tip.innerText = "Length: 6~18 chars";
    password_tip.style.color = '#999';
    password_tip.style.display = 'block';
  }, true);
  idCode_input.addEventListener('click', function () {
    idCode_tip.innerText = "Length: 6 digits";
    idCode_tip.style.color = '#999';
    idCode_tip.style.display = 'block';
  }, true);
  idCode_get_btn.addEventListener("click", click_idCode_get_btn, true);
  submit_btn.addEventListener("click", click_submit_btn, true);
  document.addEventListener('click', function () {
    idCode_tip.style.display = 'none';
    password_tip.style.display = 'none';
    emailAddress_tip.style.display = 'none';
  }, true);
}

window.onload = function () {
  init_tips();
};