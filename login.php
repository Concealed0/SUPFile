<?php
session_start();
$emailAddressInput = $_POST['loginEmailAddress'];
$passwordInput = $_POST['loginPassword'];

$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname = "supfile_db";
$conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM user_list WHERE email_address='$emailAddressInput' AND password='$passwordInput'";
$result = $conn->query($sql);
if ($result->num_rows == 1) {
  $_SESSION['emailAddress'] = $emailAddressInput;
  $_SESSION['currentFolder'] = "./account/" . $emailAddressInput;
  echo "s";
} else {
  session_destroy();
  echo "f";
}
$conn->close();
?>