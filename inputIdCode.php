<?php
session_start();
$idCode = $_SESSION['idCode'];
$emailAddressInput = $_SESSION['inputEmailAddress'];
$nameInput = $_SESSION['inputname'];
$passwordInput = $_SESSION['inputpassword'];

$inputCode = $_GET['inputCode'];

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

if ($idCode == $inputCode) {
  $sql = "INSERT INTO user_list (username, password, email_address) VALUES ('$nameInput', '$passwordInput', '$emailAddressInput')";
  if ($conn->query($sql) === TRUE) {
    $dir = iconv("UTF-8", "GBK", "./account/" . $emailAddressInput);
    if (!file_exists($dir)) {
      mkdir($dir, 0777);
      session_destroy();
      echo "<script>alert('Register success!');</script>";
      echo "<script>window.location.href='index.html'</script>";
    } else {
      session_destroy();
      echo "<script>alert('mkdir failed!');</script>";
      echo "<script>window.location.href='register.html'</script>";
    }
  } else {
    $msg =  "Error: " . $sql . "<br>" . $conn->error;
    session_destroy();
    echo "<script>alert($msg);</script>";
    echo "<script>window.location.href='register.html'</script>";
  }
} else {
  session_destroy();
  echo "<script>alert('Id Code error!');</script>";
  echo "<script>window.location.href='inputIdCode.html'</script>";
}
?>