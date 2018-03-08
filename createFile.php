<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$inputFileName = $_GET['newFileName'];

$dir = iconv("UTF-8", "GBK", "./account/".$emailAddress."/".$inputFileName);
$myfile = fopen($dir, "w") or die("Unable to create file!");

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

/*
echo "<table border='1'><tr><td colspan='6'>File Name</td></tr>";
$renameBtn = "<td><button class='renameBtn'>Rename</button></td>";
$deleteBtn = "<td><button class='deleteBtn'>Delete</button></td>";
$downloadBtn = "<td><button class='downloadBtn'>Download</button></td>";
$moveBtn = "<td><button class='moveBtn'>Move</button></td>";
$shareBtn = "<td><button class='shareBtn'>Share</button></td>";
$functionStr = $renameBtn.$deleteBtn.$downloadBtn.$moveBtn.$shareBtn;

$handler = opendir('./account/' . $emailAddress);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != "..") {
    echo "<tr><td>".$filename."</td>".$functionStr."</tr>";
  }
}
echo "</table>";*/
?>