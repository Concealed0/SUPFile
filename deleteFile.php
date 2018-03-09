<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$name = $_GET['name'];
$dir = $currentFolder . "/" . $name;

function deldir($dir) {
  $dh = opendir($dir);
  while ($file = readdir($dh)) {
    if($file != "." && $file!="..") {
      $fullpath = $dir."/".$file;
      if(!is_dir($fullpath)) {
        unlink($fullpath);
      } else {
        deldir($fullpath);
      }
    }
  }
  closedir($dh);
  if (rmdir($dir)) {
    return true;
  } else {
    return false;
  }
}
if (is_dir($dir)) {
  deldir($dir);
} else if (is_file($dir)) {
  if (!unlink($dir)) {
    echo "Error deleting";
  }
}
?>