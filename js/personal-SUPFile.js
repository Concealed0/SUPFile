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

window.onbeforeunload = function() {
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
    }
  }
  xmlhttp.open("GET", "closePageAndLogout.php", true);
  xmlhttp.send();
}

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
        //document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
        var fileList = JSON.parse(xmlhttp.responseText);
        initTable(fileList);
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
        //document.getElementById("frame-file").innerHTML = xmlhttp.responseText;
        var fileList = JSON.parse(xmlhttp.responseText);
        initTable(fileList);
      }
    }
    xmlhttp.open("GET", "createFile.php?newFileName="+inputName, true);
    xmlhttp.send();
  }
}

/*function showFiles() {
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
}*/

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
      //document.getElementById("frame-file").innerText = xmlhttp.responseText;
      var fileList = JSON.parse(xmlhttp.responseText);
      //alert(fileList);
      initTable(fileList);
    }
  }
  xmlhttp.open("GET", "getUserFiles.php", true);
  xmlhttp.send();
}

function initTable(fileList) {
  var length = fileList.length;
  var fileListHTML = "<table border='1'><tr><td colspan='1'>File Name</td><td colspan='1'>File Type</td><td colspan='5' style='text-align:center;'>tools</td></tr>";
  for (var i=0; i<length; i++) {
    fileListHTML = fileListHTML+"<tr><td>"+fileList[i][0]+"</td><td>"+fileList[i][1]+"</td><td>"+"<button id='"+fileList[i][0]+"-renameBtn'>Rename</button></td><td><button id='"+fileList[i][0]+"-deleteBtn'>Delete</button></td><td><button id='"+fileList[i][0]+"-downloadBtn'>Download</button></td><td><button id='"+fileList[i][0]+"-moveBtn'>Move</button></td><td><button id='"+fileList[i][0]+"-shareBtn'>Share</button></td></tr>";
  }
  fileListHTML = fileListHTML + "</table>";
  document.getElementById("frame-file").innerHTML = fileListHTML;
}