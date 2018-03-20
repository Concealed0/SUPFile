<?php
require "functions.php";
require "vendor/autoload.php";
session_start();
$input_emailAddress = $_POST['emailAddress'];

function sendIdMail($to, $num) {
  $title = 'Security Code';
  $content = 'Your security code: ' . $num . ' (from supfile.top/SUPFile/).';
  if (sendMail($to,$title,$content)) {
    echo "1";
  } else {
    echo "0";
  }
}

$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname = "supfile_db";
$conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM user_list WHERE email_address='$input_emailAddress'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  echo "true";
} else {
  $idCode = rand(100000, 999999);
  $_SESSION['idCode'] = $idCode;
  $_SESSION['inputEmailAddress'] = $input_emailAddress;
  sendIdMail($input_emailAddress, $idCode);
}
$conn->close();
?>