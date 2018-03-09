<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$backFolder = dirname($currentFolder);
if ($backFolder == './account') {
  echo "Can't back";
} else {
  $_SESSION['currentFolder'] = $backFolder;
}
?>