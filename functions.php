<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to,$title,$content){
  $db_servername = "localhost";
  $db_username = "root";
  $db_password = "root";
  $db_dbname = "supfile_db";
  $conn = new mysqli($db_servername, $db_username,$db_password, $db_dbname);
  if ($conn->connect_error) {
    echo "Failed";
    die("Failed: " . $conn->connect_error);
  }
  $sql = "SELECT password, email_address FROM admin_email_list";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $email_address = $row["email_address"];
  $pwd = $row["password"];
  $conn->close();
  $mail = new PHPMailer();
  $mail->SMTPDebug = 1;
  $mail->isSMTP();
  $mail->SMTPAuth=true;
  $mail->Host = 'smtp.mxhichina.com';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->Hostname = 'supfile.top/SUPFile/';
  $mail->CharSet = 'UTF-8';
  $mail->FromName = 'SUPFile - Administrator';
  $mail->Username = $email_address;
  $mail->Password = $pwd;
  $mail->From = $email_address;
  $mail->isHTML(true);
  $mail->addAddress($to,'SUPFile Account');
  $mail->Subject = $title;
  $mail->Body = $content;
  return $status = $mail->send();
}
?>