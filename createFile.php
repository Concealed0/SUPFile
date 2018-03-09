<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$inputFileName = $_GET['newFileName'];

$dir = iconv("UTF-8", "GBK", $currentFolder."/".$inputFileName);
$myfile = fopen($dir, "w") or die("Unable to create file!");
?>