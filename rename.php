<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$name = $_GET['name'];
$nameStr = explode('|', $name, 2);
$fileName = $nameStr[0];
$newName = $nameStr[1];

$oldName = $currentFolder . '/' . $fileName;
$newName = $currentFolder . '/' . $newName;
if (rename($oldName, $newName)) {
  echo "rename success";
} else {
  echo "rename failed";
}
?>