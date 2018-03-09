<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$name = $_GET['name'];
$dir = "./account/" . $emailAddress . "/" . $name;
if (is_dir($dir)) {
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
  if(rmdir($dir)) {
    echo ("Deleted $file");
  } else {
    echo ("Error deleting $file");
  }
} else {
  if (!unlink($dir)) {
    echo ("Error deleting $file");
  } else {
    echo ("Deleted $file");
  }
}
?>