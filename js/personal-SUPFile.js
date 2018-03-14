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
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById("emailAddressLogged").innerText = xmlhttp.responseText;
      document.title = "SUPFile - " + xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", "getEmailAddress.php", true);
  xmlhttp.send();

  document.getElementById("createFolderBtn").addEventListener('click', createFolder, false);
  document.getElementById("createFileBtn").addEventListener('click', createFile, false);
  document.getElementById("backBtn").addEventListener('click', backFolder, false);

  showFiles();
};

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
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      initTable(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.open("GET", "getUserFiles.php", true);
  xmlhttp.send();
}

function initTable(fileList) {
  var fileListHTML = "<table border='1'><tr><td>File Name</td><td>File Type</td><td style='text-align: center;'>tools</td></tr>";
  for (var i = 0; i < fileList.length; i++) {
    fileListHTML = fileListHTML + "<tr><td>" + fileList[i][0] + "</td><td>" + fileList[i][1] + "</td><td>" + "<button id='" + fileList[i][0] + "-openBtn'>Open</button>" + "<button id='" + fileList[i][0] + "-renameBtn'>Rename</button><button id='" + fileList[i][0] + "-deleteBtn'>Delete</button><button id='" + fileList[i][0] + "-downloadBtn'>Download</button><button id='" + fileList[i][0] + "-moveBtn'>Move</button><button id='" + fileList[i][0] + "-shareBtn'>Share</button></td></tr>";
  }
  document.getElementById("frame-file").innerHTML = fileListHTML + "</table>";
  addListener(fileList);
}

function addListener(fileList) {
  for (var i = 0; i < fileList.length; i++) {
    document.getElementById(fileList[i][0] + "-openBtn").addEventListener('click', openFolder, false);
    document.getElementById(fileList[i][0] + "-renameBtn").addEventListener('click', rename, false);
    document.getElementById(fileList[i][0] + "-deleteBtn").addEventListener('click', deleteOneFile, false);
    document.getElementById(fileList[i][0] + "-downloadBtn").addEventListener('click', downloadOneFile, false);
    document.getElementById(fileList[i][0] + "-moveBtn").addEventListener('click', moveFile, false);
  }
}

function moveFile(event) {
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));

  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "block";

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      frameMoveInitTable(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.open("GET", "moveFile-getUserFiles.php?name=" + fileName, true);
  xmlhttp.send();
}

function frameMoveInitTable(fileList) {
  var fileListHTML = "<table border='1'><tr><td><button id='move-backBtn'>Back</button></td><td><button id='move-closeBtn'>Close</button></td></tr><tr><td>File Name</td><td>Tools</td></tr>";
  for (var i = 0; i < fileList.length; i++) {
    fileListHTML = fileListHTML + "<tr><td>" + fileList[i] + "</td><td>" + "<button id='" + fileList[i] + "-moveOpenBtn'>Open</button>" + "<button id='" + fileList[i] + "-moveMoveBtn'>Move</button></td></tr>";
  }
  document.getElementById("frame-move").innerHTML = fileListHTML + "</table>";
  frameMoveAddListener(fileList);
}

function frameMoveAddListener(fileList) {
  document.getElementById('move-backBtn').addEventListener('click', frameMoveBackFolder, false);
  document.getElementById('move-closeBtn').addEventListener('click', frameMoveCloseFolder, false);
  for (var i = 0; i < fileList.length; i++) {
    document.getElementById(fileList[i] + "-moveOpenBtn").addEventListener('click', frameMoveOpenFolder, false);
    document.getElementById(fileList[i] + "-moveMoveBtn").addEventListener('click', frameMoveMoveFile, false);
  }
}

function frameMoveMoveFile(event) {
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var name = obj.id.substring(0, obj.id.lastIndexOf("-"));

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById("frame-move").style.display = "none";
      showFiles();
    }
  };
  xmlhttp.open("GET", "moveFile-moveFolder.php?name=" + name, true);
  xmlhttp.send();
}

function frameMoveOpenFolder() {
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var name = obj.id.substring(0, obj.id.lastIndexOf("-"));

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      moveShowFile();
    }
  };
  xmlhttp.open("GET", "moveFile-openFolder.php?name=" + name, true);
  xmlhttp.send();
}

function frameMoveCloseFolder() {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
}

function frameMoveBackFolder() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      moveShowFile();
    }
  };
  xmlhttp.open("GET", "moveFile-backFolder.php", true);
  xmlhttp.send();
}

function moveShowFile() {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "block";

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      frameMoveInitTable(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.open("GET", "moveFile-getBackFiles.php", true);
  xmlhttp.send();
}

function createFolder() {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
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
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        showFiles();
      }
    };
    xmlhttp.open("GET", "createFolder.php?newFolderName=" + inputName, true);
    xmlhttp.send();
  }
}

function createFile() {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
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
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        showFiles();
      }
    };
    xmlhttp.open("GET", "createFile.php?newFileName=" + inputName, true);
    xmlhttp.send();
  }
}

function backFolder() {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      showFiles();
    }
  };
  xmlhttp.open("GET", "backFolder.php", true);
  xmlhttp.send();
}

function openFolder(event) {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var name = obj.id.substring(0, obj.id.lastIndexOf("-"));

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      showFiles();
    }
  };
  xmlhttp.open("GET", "openFolder.php?name=" + name, true);
  xmlhttp.send();
}

function rename(event) {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var oldName = obj.id.substring(0, obj.id.lastIndexOf("-"));

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
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        showFiles();
      }
    };
    xmlhttp.open("GET", "rename.php?name=" + oldName + "|" + newName, true);
    xmlhttp.send();
  }
}

function deleteOneFile(event) {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var name = obj.id.substring(0, obj.id.lastIndexOf("-"));

  var xmlhttp;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      showFiles();
    }
  };
  xmlhttp.open("GET", "deleteFile.php?name=" + name, true);
  xmlhttp.send();
}

function downloadOneFile(event) {
  var frameMove = document.getElementById("frame-move");
  frameMove.style.display = "none";
  event = event ? event : window.event;
  var obj = event.srcElement ? event.srcElement : event.target;
  var name = obj.id.substring(0, obj.id.lastIndexOf("-"));
  window.location.href = "download.php?downName=" + name;
}