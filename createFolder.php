<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];
$inputFolderName = $_GET['newFolderName'];

$dir = iconv("UTF-8", "GBK", "./account/".$emailAddress."/".$inputFolderName);
if (!file_exists($dir)) {
  mkdir($dir, 0777);

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
} else {
  echo "<script>alert('mkdir failed!');</script>";
}

/*
echo "<table border='1'><tr><td colspan='6'>File Name</td></tr>";
$renameBtn = "<td><button>Rename</button></td>";
$deleteBtn = "<td><button>Delete</button></td>";
$downloadBtn = "<td><button>Download</button></td>";
$moveBtn = "<td><button>Move</button></td>";
$shareBtn = "<td><button>Share</button></td>";
$functionStr = $renameBtn.$deleteBtn.$downloadBtn.$moveBtn.$shareBtn;

$handler = opendir('./account/' . $emailAddress);
while (($filename = readdir($handler)) !== false) {
  if ($filename != "." && $filename != "..") {
    echo "<tr><td>".$filename."</td>".$functionStr."</tr>";
  }
}
echo "</table>";*/
?>