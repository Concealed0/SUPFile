<?php
  session_start();
  $emailAddress = $_SESSION['emailAddress'];
  /*  MySQL database server name, username, password & dbname
  $db_servername = "localhost";
  $db_username = "root";
  $db_password = "root";
  $db_dbname = "supfile_db";
  //  MySQLi build connect & test 1
  $conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
  if ($conn->connect_error) {
    echo "Failed";
    die("Failed: " . $conn->connect_error);
  } else {
    echo "Success";
  }
  $conn->query("UPDATE user_list SET log_status=0 WHERE email_address='$emailAddress'");*/

  $_SESSION['emailAddress'] = null;
  $_SESSION['currentFolder'] = null;
  echo "<script>window.location.href='index.html'</script>";
?>