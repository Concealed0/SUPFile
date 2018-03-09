<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$folderName = $_GET['name'];

if (!is_file($currentFolder.'/'.$folderName)) {
  $_SESSION['currentFolder'] = $currentFolder . '/' . $folderName;
} else {
  echo $folderName . " is not a folder.";
  //  Open picture and video
}
?>