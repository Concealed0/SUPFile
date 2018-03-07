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
  var createFolderBtn = document.getElementById("createFolderBtn");
  var createFileBtn = document.getElementById("createFileBtn");
  createFolderBtn.addEventListener('click', createFolder, false);
  createFileBtn.addEventListener('click', createFile, false);
}

function createFolder() {
  var inputName = prompt("Please input new folder name: ","");
  if (inputName) {
    /*var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
      }
    };
    xhr.open("POST", "createFolder.php");
    xhr.send("newFolderName="+inputName);*/
    
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