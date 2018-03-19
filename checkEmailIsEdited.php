<?php
session_start();
$input_emailAddress = $_POST['emailAddress'];
$input_idCode = $_POST['inputIdCode'];
$input_password = $_POST['inputPassword'];
$last_input_emailAddress = $_SESSION['inputEmailAddress'];
$send_idCode = $_SESSION['idCode'];

function register_account() {
  $db_servername = "localhost";
  $db_username = "root";
  $db_password = "root";
  $db_dbname = "supfile_db";
  $input_password = $_POST['inputPassword'];
  $input_emailAddress = $_POST['emailAddress'];
  $conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
  if ($conn->connect_error) {
    echo  $conn->connect_error;
  } else {
    $sql = "INSERT INTO user_list (password, email_address) VALUES ('$input_password', '$input_emailAddress')";
    if ($conn->query($sql) === TRUE) {
      $dir = iconv("UTF-8", "GBK", "./account/" . $input_emailAddress);
      if (!file_exists($dir)) {
        mkdir($dir, 0777);
        session_destroy();
        echo "s";
      } else {
        session_destroy();
        echo "mkdir error";
      }
    } else {
      $msg =  "Error: " . $sql . "<br>" . $conn->error;
      session_destroy();
      echo $msg;
    }
  }
}

if ($input_emailAddress == $last_input_emailAddress) {
  if ($input_idCode == $send_idCode) {
    register_account();
  } else {
    echo "e";
  }
} else {
  echo "c";
}
?>