<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$inputFileName = $_GET['newFileName'];

$dir = iconv("UTF-8", "GBK", "./account/".$emailAddress."/".$inputFileName);
$myfile = fopen($dir, "w") or die("Unable to create file!");
?>