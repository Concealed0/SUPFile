<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$name = $_GET['downloadName'];

$file_name = $name;
$file_dir = "./account/" . $emailAddress . "/";
echo "<script>alert($file_name);</script>";
echo "<script>alert($file_dir);</script>";

if (! file_exists ( $file_dir . $file_name )) {
  echo "文件找不到";
  exit ();
} else {
  $file = fopen ( $file_dir . $file_name, "r" );
  Header ( "Content-type: application/octet-stream" );
  Header ( "Accept-Ranges: bytes" );
  Header ( "Accept-Length: " . filesize ( $file_dir . $file_name ) );
  Header ( "Content-Disposition: attachment; filename=" . $file_name );
  echo fread ( $file, filesize ( $file_dir . $file_name ) );
  fclose ( $file );
  exit ();
}
?>