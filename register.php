<?php
$emailAddressInput = $_GET['emailAddress'];
$passwordInput = $_GET['password'];
$nameInput = $_GET['name'];

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
}/* else {
  echo "Success";
}*/

//  Email address repeat test
$sql = "SELECT * FROM user_list WHERE email_address='$emailAddressInput'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {//  Email has been registered
  echo "<script>alert('This email has been registered!');</script>";
  echo "<script>window.location.href='register.html'</script>";
} else {
  //  Add account in MySQL
  $sql = "INSERT INTO user_list (username, password, email_address) VALUES ('$nameInput', '$passwordInput', '$emailAddressInput')";
  if ($conn->query($sql) === TRUE) {
    $dir = iconv("UTF-8", "GBK", "./account/" . $emailAddressInput);
    if (!file_exists($dir)) {
      mkdir($dir, 0777);
    } else {
      echo "<script>alert('mkdir failed!');</script>";
      echo "<script>window.location.href='register.html'</script>";
    }
    echo "<script>alert('Register success!');</script>";
    echo "<script>window.location.href='login.html'</script>";
  } else {
    $msg =  "Error: " . $sql . "<br>" . $conn->error;
    echo "<script>alert($msg);</script>";
    echo "<script>window.location.href='register.html'</script>";
  }
}

$conn->close();
?>