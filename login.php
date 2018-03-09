<?php
session_start();

//  User input email address & password
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
}/* else {
  echo "Success";
}*/

/*  MySQLi build connect & test 2
$con = mysqli_connect($db_servername, $db_username, $db_password, $db_dbname);
if (mysqli_connect_errno()) {
  echo "Failed";
} else {
  echo "Success";
}
*/

/*  PDO build connect & test
try {
  $conn = new PDO("mysql:host=$db_servername;dbname=$db_dbname", $db_username, $db_password);
  echo "Success";
} catch (PDOException $e) {
  echo $e->getMessage();
}
*/

//  User input email address & password test and search in db
//  Check log status(0: un log & 1: logged)
$sql = "SELECT * FROM user_list WHERE email_address='$emailAddressInput' AND password='$passwordInput'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
if ($result->num_rows == 1 /*&& $row["log_status"] == 0*/) {
  $_SESSION['emailAddress'] = $emailAddressInput;
  //$conn->query("UPDATE user_list SET log_status=1 WHERE email_address='$emailAddressInput'");
  echo "<script>window.location.href='personal-SUPFile.html'</script>";
}/* else if ($row["log_status"] == 1) {
  echo "<script>alert('This account has been logged!');</script>";
  echo "<script>window.location.href='login.html'</script>";
}*/ else {
  echo "<script>alert('Did not find this user or Password error!');</script>";
  echo "<script>window.location.href='login.html'</script>";
}

$conn->close();
?>