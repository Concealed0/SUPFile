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
};

window.onbeforeunload = function () {
  var n = window.event.screenX - window.screenLeft;
  var b = n > document.documentElement.scrollWidth - 20;
  if (b && window.event.clientY < 0 || window.event.altKey) {
    alert("这是一个关闭操作而非刷新");
    window.event.returnValue = "";
    //  Close page and logout
    window.event.returnValue = "";
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
        window.event.returnValue = "";
      }
    }
    xmlhttp.open("GET", "closePageAndLogout.php", true);
    xmlhttp.send();
  } else {
    alert("这是一个刷新操作而非关闭");
  }
}

window.onunload = function () {
  var n = window.event.screenX - window.screenLeft;
  var b = n > document.documentElement.scrollWidth - 20;
  if (b && window.event.clientY < 0 || window.event.altKey) {
    alert("这是一个关闭操作而非刷新");
    window.event.returnValue = "";
    //  Close page and logout
    window.event.returnValue = "";
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
        window.event.returnValue = "";
      }
    }
    xmlhttp.open("GET", "closePageAndLogout.php", true);
    xmlhttp.send();
  } else {
    alert("这是一个刷新操作而非关闭");
  }
}

function addListener(fileList) {
  document.getElementById("createFolderBtn").addEventListener('click', createFolder, false);
  document.getElementById("createFileBtn").addEventListener('click', createFile, false);
  for (var i = 0; i < fileList.length; i++) {
    document.getElementById(fileList[i][0] + "-renameBtn").onclick = function (event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));
      rename(fileName);
    }

    document.getElementById(fileList[i][0] + "-deleteBtn").onclick = function (event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));
      deleteOneFile(fileName);
    }
  }
}

function deleteOneFile(fileName) {
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
      //var fileList = JSON.parse(xmlhttp.responseText);
      //alert(fileList);
      showFiles();
      //addListener(fileList);
    }
  }
  xmlhttp.open("GET", "deleteFile.php?name="+fileName, true);
  xmlhttp.send();
}

function rename(fileName) {
  var newName = prompt("Please input new name: ", "");
  if (newName) {
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
        var fileList = JSON.parse(xmlhttp.responseText);
        initTable(fileList);
        //addListener(fileList);
      }
    }
    xmlhttp.open("GET", "rename.php?name=" + fileName + "|" + newName, true);
    xmlhttp.send();
  }
}

function createFolder() {
  var inputName = prompt("Please input new folder name: ", "");
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
        var fileList = JSON.parse(xmlhttp.responseText);
        initTable(fileList);
        //addListener(fileList);
      }
    }
    xmlhttp.open("GET", "createFolder.php?newFolderName=" + inputName, true);
    xmlhttp.send();
  }
}

function createFile() {
  var inputName = prompt("Please input new file name: ", "");
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
        var fileList = JSON.parse(xmlhttp.responseText);
        initTable(fileList);
        //addListener(fileList);
      }
    }
    xmlhttp.open("GET", "createFile.php?newFileName=" + inputName, true);
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
      var fileList = JSON.parse(xmlhttp.responseText);
      initTable(fileList);
      //addListener(fileList);
    }
  }
  xmlhttp.open("GET", "getUserFiles.php", true);
  xmlhttp.send();
}

function initTable(fileList) {
  var length = fileList.length;
  var fileListHTML = "<table border='1'><tr><td colspan='1'>File Name</td><td colspan='1'>File Type</td><td colspan='5' style='text-align:center;'>tools</td></tr>";
  for (var i = 0; i < length; i++) {
    fileListHTML = fileListHTML + "<tr><td>" + fileList[i][0] + "</td><td>" + fileList[i][1] + "</td><td>" + "<button id='" + fileList[i][0] + "-renameBtn'>Rename</button></td><td><button id='" + fileList[i][0] + "-deleteBtn'>Delete</button></td><td><button id='" + fileList[i][0] + "-downloadBtn'>Download</button></td><td><button id='" + fileList[i][0] + "-moveBtn'>Move</button></td><td><button id='" + fileList[i][0] + "-shareBtn'>Share</button></td></tr>";
  }
  fileListHTML = fileListHTML + "</table>";
  document.getElementById("frame-file").innerHTML = fileListHTML;
  addListener(fileList);
}