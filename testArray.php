<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];

$responseText = array();
$i = 0;

$handler = opendir('./account/' . $emailAddress);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != "..") {
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
echo json_encode($responseText);
?>