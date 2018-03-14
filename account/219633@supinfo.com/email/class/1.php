<?php
	require_once ('class/email.class.php');
	//##########################################
	$mailto='hughshieh@qq.com';
$mailsubject="测试邮件";
$mailbody='Test ID code: 123456';
$smtpserver     = "smtpdm.aliyun.com";
$smtpserverport = 25;
$smtpusermail   = "supfile@aliyun.com";
$smtpuser       = "supfile@aliyun.com";
$smtppass       = "supinfo7";
$mailsubject    = "=?UTF-8?B?" . base64_encode($mailsubject) . "?=";
$mailtype       = "HTML";
$smtp           = new smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass);
$smtp->debug    = false;
$smtp->sendmail($mailto, $smtpusermail, $mailsubject, $mailbody, $mailtype);
?>