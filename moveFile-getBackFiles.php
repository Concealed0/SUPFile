<?php
session_start();
$currentFolder = $_SESSION['moveCurrentFolder'];

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