//  Edit title by user's email address when init page
window.onload = function () {
  var xmlhttp;
    if (window.XMLHttpRequest) {
      //  IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("emailAddressLogged").innerText = xmlhttp.responseText;
        document.title = "SUPFile - " + xmlhttp.responseText;
      }
    }
    xmlhttp.open("GET", "getEmailLogged.php", true);
    xmlhttp.send();

  showFiles();
  addListener();
};

function addListener() {
  document.getElementById("createFolderBtn").addEventListener('click', createFolder, false);
  document.getElementById("createFileBtn").addEventListener('click', createFile, false);
  //document.getElementsByClassName("renameBtn").addEventListener('click', renameFile, false);
}

/*function renameFile() {
  var fileName = prompt("Please input new folder name: ","");
  if (inputName) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      //  IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
      }
    }
    xmlhttp.open("GET", "renameFile.php?fileName="+inputName, true);
    xmlhttp.send();
  }
}*/

function createFolder() {
  var inputName = prompt("Please input new folder name: ","");
  if (inputName) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      //  IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
      }
    }
    xmlhttp.open("GET", "createFolder.php?newFolderName="+inputName, true);
    xmlhttp.send();
  }
}

function createFile() {
  var inputName = prompt("Please input new file name: ","");
  if (inputName) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      //  IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
      }
    }
    xmlhttp.open("GET", "createFile.php?newFileName="+inputName, true);
    xmlhttp.send();
  }
}

function showFiles() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET", "getUserFiles.php", true);
  xmlhttp.send();
}