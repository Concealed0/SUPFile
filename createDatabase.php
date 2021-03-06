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
}

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
}

//  Create table user_list
$sql = "CREATE TABLE IF NOT EXISTS `user_list`(
  `user_id` INT UNSIGNED AUTO_INCREMENT,
  `password` VARCHAR(18) NOT NULL,
  `email_address` VARCHAR(40) NOT NULL,
  PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";
if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "Create table error: " . $conn->error;
}

//  Create table admin_email_list
$sql = "CREATE TABLE IF NOT EXISTS `admin_email_list`(
  `user_id` INT UNSIGNED AUTO_INCREMENT,
  `password` VARCHAR(20) NOT NULL,
  `email_address` VARCHAR(40) NOT NULL,
  PRIMARY KEY ( `user_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";
if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "Create table error: " . $conn->error;
}
$conn->close();
?>