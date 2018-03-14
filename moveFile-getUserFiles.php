<?php
session_start();
$_SESSION['moveCurrentFolder'] = $_SESSION['currentFolder'];
$currentFolder = $_SESSION['moveCurrentFolder'];
$_SESSION['moveFileName'] = $currentFolder . '/' . $_GET['name'];
$_SESSION['targetFileName'] = $_GET['name'];

$responseText = array();
$i = 0;

$handler = opendir($currentFolder);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != ".." && $filename != ".DS_Store" && !is_file($currentFolder.'/'.$filename)) {
    $responseText[$i] = $filename;
    $i++;
  }
}
echo json_encode($responseText);
?>