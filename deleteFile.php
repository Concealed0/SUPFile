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
    return true;
  } else {
    return false;
  }
} else {
  if (!unlink($dir)) {
    echo ("Error deleting $file");
  } else {
    echo ("Deleted $file");
  }
}
/*
$responseText = array();
$i = 0;
$handler = opendir('./account/' . $emailAddress);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != ".." && $filename != ".DS_Store") {
    $responseText[$i][0] = $filename;
    //  Check file type
    if (is_file('./account/' . $emailAddress . '/' . $filename)) {
      //$file = fopen('./account/' . $emailAddress . '/' . $filename ,"r");
      $responseText[$i][1] = pathinfo('./account/' . $emailAddress . '/' . $filename , PATHINFO_EXTENSION);
    } else {
      $responseText[$i][1] = "folder";
    }
    $i++;
  }
}
echo json_encode($responseText);*/
?>