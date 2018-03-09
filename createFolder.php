<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$inputFolderName = $_GET['newFolderName'];

$dir = iconv("UTF-8", "GBK", "./account/".$emailAddress."/".$inputFolderName);
if (!file_exists($dir)) {
  mkdir($dir, 0777);
} else {
  echo "mkdir failed";
}
?>