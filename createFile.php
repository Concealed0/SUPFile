<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$inputFileName = $_GET['newFileName'];

$dir = iconv("UTF-8", "GBK", "./account/".$emailAddress."/".$inputFileName);
$myfile = fopen($dir, "w") or die("Unable to create file!");

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

echo "</table>";
?>