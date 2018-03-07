<?php
session_start();
$emailAddress = $_SESSION['emailAddress'];

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

echo "</table>";
?>