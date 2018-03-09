<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$inputFolderName = $_GET['newFolderName'];

$dir = iconv("UTF-8", "GBK", $currentFolder."/".$inputFolderName);
if (!file_exists($dir)) {
  mkdir($dir, 0777);
} else {
  echo "mkdir failed";
}
?>