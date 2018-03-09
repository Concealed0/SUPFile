<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];

$responseText = array();
$i = 0;

$handler = opendir($currentFolder);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != ".." && $filename != ".DS_Store") {
    $responseText[$i][0] = $filename;
    //  Check file type
    if (is_file($currentFolder . '/' . $filename)) {
      $responseText[$i][1] = pathinfo($currentFolder . '/' . $filename , PATHINFO_EXTENSION);
    } else {
      $responseText[$i][1] = "folder";
    }
    $i++;
  }
}
echo json_encode($responseText);
?>