<?php
session_start();
$currentFolder = $_SESSION['moveCurrentFolder'];
$folderName = $_GET['name'];
$name = $_SESSION['targetFileName'];
$targetDir = $currentFolder .'/' . $folderName . '/' . $name;
$oldDir = $_SESSION['moveFileName'];
rename($oldDir, $targetDir);
?>