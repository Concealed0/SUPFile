//  Input name, passowrd & email address test
function validateForm() {
  var flag = true;
  var name = document.forms["register-form"].name.value;
  var name_warn = document.getElementById("name-warning");
  if (name == null || name == "") {
    name_warn.style.display = "block";
    flag = false;
  } else {
    name_warn.style.display = "none";
  }

  var password = document.forms["register-form"].password.value;
  var pwd_warn = document.getElementById("pwd-warning");
  if (password == null || password == "") {
    pwd_warn.style.display = "block";
    flag = false;
  } else {
    pwd_warn.style.display = "none";
  }

  var email_address = document.forms["register-form"].emailAddress.value;
  var email_warn = document.getElementById("email-warning");
  var atpos = email_address.indexOf("@");
  var dotpos = email_address.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email_address.length) {
    email_warn.style.display = "block";
    flag = false;
  } else {
    email_warn.style.display = "none";
  }

  return flag;
}