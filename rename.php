<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$name = $_GET['name'];
$nameStr = explode('|', $name, 2);
$fileName = $nameStr[0];
$newName = $nameStr[1];

$oldName = './account/' . $emailAddress . '/' . $fileName;
$newName = './account/' . $emailAddress . '/' . $newName;
if (rename($oldName, $newName)) {
  echo "rename success";
} else {
  echo "rename failed";
}
?>