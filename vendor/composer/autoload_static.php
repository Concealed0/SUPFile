<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitdc1a327e27c0111635b0a4d768348527
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitdc1a327e27c0111635b0a4d768348527::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitdc1a327e27c0111635b0a4d768348527::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
