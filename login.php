<?php
//  User input email address & password
session_start();
$emailAddressInput = $_POST['emailAddress'];
$passwordInput = $_POST['password'];

//  MySQL database server name, username, password & dbname
$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname = "supfile_db";

//  MySQLi build connect & test 1
$conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}

//  User input email address & password test and search in db
$sql = "SELECT * FROM user_list WHERE email_address='$emailAddressInput' AND password='$passwordInput'";
$result = $conn->query($sql);
if ($result->num_rows == 1) {
  $_SESSION['emailAddress'] = $emailAddressInput;
  $_SESSION['currentFolder'] = "./account/" . $emailAddressInput;
  echo "<script>window.location.href='personal-SUPFile.html'</script>";
} else {
  echo "<script>alert('Did not find this user or Password error!');</script>";
  echo "<script>window.location.href='index.html'</script>";
}
$conn->close();
?>