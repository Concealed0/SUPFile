# SUPFile
在线演示地址： [supfile.top/SUPFile/](http://supfile.top/SUPFile)

## 技术栈
HTML/CSS/JavaScript + PHP

## 开发环境（LAMP）
 - Apache 2.4
 - PHP 5.6
 - MySQL 5.7

## 项目运行
1. Install LAMP 6.1.0
2. Start LAMP
3. Set port: 80
4. Set MySQL root password: root
5. cd /home/www/htdocs/
6. git clone https://github.com/xiehui07/SUPFile.git
7. Open localhost/SUPFile/createMySQL.php in browser
8. Open localhost/SUPFile/ in browser

## Install PHPMailer

```bash
cd /home/www/testMail
curl -sS https://getcomposer.org/installer | php
php composer.phar
vim composer.json
#在composer.json文件中添加以下内容
{
    "require": {
        "phpmailer/phpmailer":"*"
    }
}
#保存退出
php composer.phar install
```




## 功能分析与设计
SUPFile Inc business model is to sell online storage space across Internet. Two infrastructure must be created. The first infrastructure is a cloud of the web interface to files access. The second is the storage. Each user have 30Go to store files. Some files can be viewed online directly. For example Movies, Pictures and text files.
You've selected as the main subcontractor that will undertake the development of the POC.
The files and folder are displayed as a list if the user is connected. At the top of this list should be a menu to create a folder, add a file.
A context menu on a file or folder must be able to rename it, delete it, download it, move it to another folder and create a link to share it openly.
If the selected file is a picture or a video the context menu can display an online viewer. If a folder is selected it must be possible to download it in ZIP format.
In a folder it must be possible to drag and drop a new file.

<br/>

如果所选文件是图片或视频，则上下文菜单可以显示在线查看器。 如果选择了文件夹，则必须能够以ZIP格式下载。
在一个文件夹中，必须可以拖放一个新文件。
如果用户已连接，则文件和文件夹将显示为列表。 在这个列表的顶部应该是一个菜单来创建一个文件夹，添加一个文件。
文件或文件夹上的上下文菜单必须能够重命名，删除，下载，移动到另一个文件夹并创建链接以公开分享。

## Contact me

Name: XIE Hui

Blog: [xiehui.site](http://xiehui.site)

E-mail: 219633@supinfo.com

Campus: SUPINFO - Hebut Tianjin