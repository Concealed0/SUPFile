<?php
session_start();
$currentFolder = $_SESSION['currentFolder'];
$file_name = $_GET['downName'];
$file_dir = $currentFolder . "/";
$zip_file = "";

if (!file_exists($file_dir . $file_name)) {
  echo "Can't find file";
  exit ();
} else {
  if (is_file($file_dir . $file_name)){
	$file = fopen($file_dir . $file_name, "r");
    Header("Content-type: application/force-download");
    Header("Accept-Ranges: bytes");
    Header("Accept-Length: " . filesize($file_dir . $file_name));
    Header("Content-Disposition: attachment; filename=" . $file_name);
    echo fread($file, filesize($file_dir . $file_name));
    fclose($file);
    exit();
  }else{
		if (is_dir($file_dir . $file_name)) {
		$from = $file_dir . $file_name;  
		$to = $file_dir . $file_name . ".zip";  
		createZip($from, $to);
		$zip_file = $file_dir . $file_name . ".zip";
		$file_name = $file_name . ".zip";
		$file = fopen($file_dir . $file_name, "r");
		Header("Content-type: application/force-download");
		Header("Accept-Ranges: bytes");
		Header("Accept-Length: " . filesize($file_dir . $file_name));
		Header("Content-Disposition: attachment; filename=" . $file_name);
		echo fread($file, filesize($file_dir . $file_name));
		fclose($file);
		unlink($file_dir . $file_name);
	  }
  }  
}

function createZip($from, $to) {
  $return = array(
    'success' => false,
    'message' => '',
    'data' => array(
      'zipFile' => array(
        'name' => '',
        'path_relative' => '',
        'path_absolute' => '',
        'url' => '',
        'size' => '',
        'exists_before' => false
      )
    )
  );
  if (!class_exists('ZipArchive')) {
    $return['message'] = 'Missing ZipArchive module in server.';
    return $return;
  }
  $zip = new ZipArchive();
  if (!is_dir(dirname($to))) {
    mkdir(dirname($to), 0755, TRUE);
  }
  if (is_file($to)) {
      $return['data']['zipFile']['exists_before'] = true;
    if ($zip->open($to, ZIPARCHIVE::OVERWRITE) !== TRUE) {
      $return['message'] = "Cannot overwrite: {$to}";
      return $return;
    }
  } else {
    if ($zip->open($to, ZIPARCHIVE::CREATE) !== TRUE) {
      $return['message'] = "Could not create archive: {$to}";
      return $return;
    }
  }
  $source_path_including_dir = array();
  $prefix_relative_path_for_source = '';
  if (is_array($from)) {
    foreach ($from as $path) {
      if (file_exists($path)) {
        if ($prefix_relative_path_for_source == '') {
          $prefix_relative_path_for_source = (is_dir($path)) ? realpath($path) : realpath(dirname($path));
        }
        $source_path_including_dir[] = $path;
      } else {
        $return['message'] = 'No such file or folder: ' . $path;
        return $return;
      }
    }
  } elseif (file_exists($from)) {
    $prefix_relative_path_for_source = (is_dir($from)) ? realpath($from) : realpath(dirname($from));
    $source_path_including_dir[] = $from;
  } else {
    $return['message'] = 'No such file or folder: ' . $from;
    return $return;
  }
  $prefix_relative_path_for_source = rtrim($prefix_relative_path_for_source, '/') . '/';
  $final_list_of_files = array();
  foreach ($source_path_including_dir as $path) {
    if (is_file($path)) {
      $final_list_of_files[] = $path;
    } else {
      $list_of_files = recursive_get_files_by_path_of_folder($path);
      foreach ($list_of_files as $one) {
        $final_list_of_files[] = $one;
      }
    }
  }
  if (!count($final_list_of_files)) {
    $return['message'] = 'No valid file or folder used to zip';
    return $return;
  }
  foreach ($final_list_of_files as $one_file) {
    $zip->addFile($one_file, str_replace($prefix_relative_path_for_source, '', $one_file));
  }
  $zip->close();
  $return['success'] = true;
  $return['data']['zipFile']['name'] = pathinfo($to, PATHINFO_BASENAME);
  $return['data']['zipFile']['path_relative'] = $to;
  $return['data']['zipFile']['path_absolute'] = realpath($to);
  $return['data']['zipFile']['size'] = number_format(abs(filesize($to) / 1024), 2) . ' KB';
  return $return;
}
function recursive_get_files_by_path_of_folder($dir, $is_tree = false) {
  $files = array();
  $dir = preg_replace('/[\/]{1}$/i', '', $dir);
  if (is_dir($dir)) {
    if ($handle = opendir($dir)) {
      while (($file = readdir($handle)) !== false) {
        if ($file != "." && $file != "..") {
          if (is_dir($dir . "/" . $file)) {
            $sub_list = recursive_get_files_by_path_of_folder($dir . "/" . $file, $is_tree);
            if ($is_tree) {
              $files[$file] = $sub_list;
            } else {
              foreach ($sub_list as $one_sub_file) {
                $files[] = $one_sub_file;
              }
            }
          } else {
            $files[] = $dir . "/" . $file;
          }
        }
      }
      closedir($handle);
      return $files;
    }
  } else {
    $files[] = $dir;
    return $files;
  }
}
?>