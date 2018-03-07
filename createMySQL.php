<?php
//  MySQL database server name, username, password & dbname
$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname = "supfile_db";

//  MySQLi build connect & test 1
$conn = new mysqli($db_servername, $db_username,$db_password);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}/* else {
  echo "Success";
}*/

//  Create database supfile_db
$sql = "CREATE DATABASE ".$db_dbname;
if ($conn->query($sql) === TRUE) {
    echo "Create database success!";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
if ($conn->connect_error) {
  echo "Failed";
  die("Failed: " . $conn->connect_error);
}/* else {
  echo "Success";
}*/

//  Create table user_list
$sql = "CREATE TABLE IF NOT EXISTS `user_list`(
  `user_id` INT UNSIGNED AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `email_address` VARCHAR(40) NOT NULL,
  `log_status` INT(2) NOT NULL DEFAULT '0',
  PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";
if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "创建数据表错误: " . $conn->error;
}

$conn->close();
?>