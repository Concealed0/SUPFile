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
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      document.getElementById("emailAddressLogged").innerText = xmlhttp.responseText;
      document.title = "SUPFile - " + xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", "getEmailAddress.php", true);
  xmlhttp.send();

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
  var fileListHTML = "<table border='1'><tr><td colspan='1'>File Name</td><td colspan='1'>File Type</td><td colspan='5' style='text-align:center;'>tools</td></tr>";
  for (var i = 0; i < fileList.length; i++) {
    fileListHTML = fileListHTML + "<tr><td>" + fileList[i][0] + "</td><td>" + fileList[i][1] + "</td><td>" + "<button id='" + fileList[i][0] + "-renameBtn'>Rename</button></td><td><button id='" + fileList[i][0] + "-deleteBtn'>Delete</button></td><td><button id='" + fileList[i][0] + "-downloadBtn'>Download</button></td><td><button id='" + fileList[i][0] + "-moveBtn'>Move</button></td><td><button id='" + fileList[i][0] + "-shareBtn'>Share</button></td></tr>";
  }
  document.getElementById("frame-file").innerHTML = fileListHTML + "</table>";
  addListener(fileList);
}

function addListener(fileList) {
  document.getElementById("createFolderBtn").addEventListener('click', createFolder, false);

  document.getElementById("createFileBtn").addEventListener('click', createFile, false);

  for (var i = 0; i < fileList.length; i++) {
    document.getElementById(fileList[i][0] + "-renameBtn").onclick = function (event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      var fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));
      rename(fileName);
    };

    document.getElementById(fileList[i][0] + "-deleteBtn").onclick = function (event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      var fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));
      deleteOneFile(fileName);
    };

    document.getElementById(fileList[i][0] + "-downloadBtn").onclick = function (event) {
      event = event ? event : window.event;
      var obj = event.srcElement ? event.srcElement : event.target;
      var fileName = obj.id.substring(0, obj.id.lastIndexOf("-"));
      downloadOneFile(fileName);
    };
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
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        showFiles();
      }
    };
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
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        showFiles();
      }
    };
    xmlhttp.open("GET", "createFile.php?newFileName=" + inputName, true);
    xmlhttp.send();
  }
}

function rename(oldName) {
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

function deleteOneFile(name) {
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

function downloadOneFile(name) {
  /*var xmlhttp;
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
  xmlhttp.open("GET", "download.php?downName=" + name, true);
  xmlhttp.send();*/
  window.location.href = "download.php?downName=" + name;
}