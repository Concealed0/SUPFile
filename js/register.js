function click_submit_btn() {
  if (test_form_values_type()) {
    var input_emailAddress = document.forms['register-form'].emailAddress.value;
    var input_password = document.forms['register-form'].password.value;
    var input_idCode = document.forms['register-form'].idCode.value;
    ajax({
      method: "POST",
      url: "checkEmailIsEdited.php",
      async: true,
      data: {
        emailAddress: input_emailAddress,
        inputIdCode: input_idCode,
        inputPassword: input_password
      },
      success: function (response_text) {
        if (response_text == 'e') {
          var idCode_tip = document.getElementById("idCode-error");
          idCode_tip.innerText = "Security code error";
          idCode_tip.style.color = '#fc4343';
          idCode_tip.style.display = 'block';
        } else if (response_text == 'c') {
          var emailAddress_tip = document.getElementById("emailAddress-error");
          emailAddress_tip.innerText = "Email address error";
          emailAddress_tip.style.color = '#fc4343';
          emailAddress_tip.style.display = 'block';
        } else if (response_text == 's') {
          alert("Register Success!");
          window.location.href = "../SUPFile/index.html";
        } else {
          alert("Error: " + response_text);
        }
      }
    });
  }
}

function click_idCode_get_btn() {
  if (test_form_values_type()) {
    var input_emailAddress = document.forms['register-form'].emailAddress.value;
    ajax({
      method: "POST",
      url: "checkEmailIsRegistered.php",
      async: true,
      data: {
        emailAddress: input_emailAddress
      },
      success: function (response_text) {
        if (response_text == 'true') {
          var emailAddress_tip = document.getElementById("emailAddress-error");
          emailAddress_tip.innerText = "Email hes been registered";
          emailAddress_tip.style.color = '#fc4343';
          emailAddress_tip.style.display = 'block';
        } else {
          var idCode_tip = document.getElementById("idCode-error");
          if (response_text.charAt(response_text.length - 1) == "1") {
            idCode_tip.innerText = "Send security code success";
            idCode_tip.style.color = '#999';
            idCode_tip.style.display = 'block';
          } else if (response_text.charAt(response_text.length - 1) == "0") {
            idCode_tip.innerText = "Send security code error";
            idCode_tip.style.color = '#fc4343';
            idCode_tip.style.display = 'block';
          }
        }
      }
    });
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