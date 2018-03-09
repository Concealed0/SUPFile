<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$file_name = $_GET['downName'];
$file_dir = $currentFolder . "/";


if (!file_exists($file_dir . $file_name)) {
  echo "Can't find file";
  exit ();
} else {
  if (is_file($file_dir . $file_name)) {
    $file = fopen($file_dir . $file_name, "r");
    Header("Content-type: application/force-download");
    Header("Accept-Ranges: bytes");
    Header("Accept-Length: " . filesize($file_dir . $file_name));
    Header("Content-Disposition: attachment; filename=" . $file_name);
    echo fread($file, filesize($file_dir . $file_name));
    fclose($file);
    exit();
  } else if (is_dir($file_dir . $file_name)) {
    //  Build .zip and download
  }
}
?>