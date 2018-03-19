<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to,$title,$content){
  $mail = new PHPMailer();
  $mail->SMTPDebug = 1;
  $mail->isSMTP();
  $mail->SMTPAuth=true;
  $mail->Host = 'smtp.qq.com';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;
  $mail->Hostname = 'supfile.top/SUPFile/';
  $mail->CharSet = 'UTF-8';
  $mail->FromName = 'SUPFile - Register';
  $mail->Username ='979499575@qq.com';
  $mail->Password = 'dqibmyogcqoebfba';
  $mail->From = '979499575@qq.com';
  $mail->isHTML(true);
  $mail->addAddress($to,'Register account');
  $mail->Subject = $title;
  $mail->Body = $content;
  return $status = $mail->send();
}
?>