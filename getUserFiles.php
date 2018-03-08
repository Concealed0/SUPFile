<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];

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
echo json_encode($responseText);

/*  html responseTest
echo "<table border='1'><tr><td colspan='6'>File Name</td></tr>";

$renameBtn1 = "<td><button id='";
$renameBtn2 = "'>Rename</button></td>";

$deleteBtn1 = "<td><button id='";
$deleteBtn2 = "'>Delete</button></td>";

$downloadBtn1 = "<td><button id='";
$downloadBtn2 = "'>Download</button></td>";

$moveBtn1 = "<td><button id='";
$moveBtn2 = "'>Move</button></td>";

$shareBtn1 = "<td><button id='";
$shareBtn2 = "'>Share</button></td>";

$handler = opendir('./account/' . $emailAddress);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != "..") {
    echo "<tr><td>".$filename."</td>".$renameBtn1.$filename."-renameBtn".$renameBtn2.$deleteBtn1.$filename."-deleteBtn".$deleteBtn2.$downloadBtn1.$filename."-downloadBtn".$downloadBtn2.$moveBtn1.$filename."-moveBtn".$moveBtn2.$shareBtn1.$filename."-shareBtn".$shareBtn2."</tr>";
  }
}
echo "</table>";*/
?>