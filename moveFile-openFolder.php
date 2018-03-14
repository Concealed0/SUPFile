<?php
session_start();
$currentFolder = $_SESSION['moveCurrentFolder'];
$folderName = $_GET['name'];

if (!is_file($currentFolder.'/'.$folderName)) {
  $_SESSION['moveCurrentFolder'] = $currentFolder . '/' . $folderName;
} else {
  echo $folderName . " is not a folder.";
  //  Open picture and video
}
?>