<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to,$title,$content){
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
  $mail->Username ='administrator@supfile.top';
  $mail->Password = '';
  $mail->From = 'administrator@supfile.top';
  $mail->isHTML(true);
  $mail->addAddress($to,'SUPFile Account');
  $mail->Subject = $title;
  $mail->Body = $content;
  return $status = $mail->send();
}
?>
