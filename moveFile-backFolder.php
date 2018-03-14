<?php
session_start();
$currentFolder = $_SESSION['moveCurrentFolder'];
$backFolder = dirname($currentFolder);
if ($backFolder == './account') {
  echo "Can't back";
} else {
  $_SESSION['moveCurrentFolder'] = $backFolder;
}
?>