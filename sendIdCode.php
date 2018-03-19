<?php
require "functions.php";
require "vendor/autoload.php";
session_start();
$forgetInputEmailAddress = $_POST['forgetInputEmailAddress'];

$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname = "supfile_db";
$conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM user_list WHERE email_address='$forgetInputEmailAddress'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  //  Send password
  $sql = "SELECT password FROM user_list WHERE email_address='$forgetInputEmailAddress'";
  $result = $conn->query($sql);
  $pwd = $result->fetch_array()[0];
  $to = $forgetInputEmailAddress;
  $title = 'SUPFile - Account password';
  $content = 'Your password: ' . $pwd . ' (from supfile.top/SUPFile/)';
  if (sendMail($to,$title,$content)) {
    echo "s";
  } else {
    echo "e";
  }
} else {
  echo "f";
}
?>