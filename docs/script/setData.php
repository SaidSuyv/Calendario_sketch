<?php

  $course = new CourseDB();
  $requestNewCourse = $_POST['verify'];
  
  if (isset($requestNewCourse) && $requestNewCourse !== '') {
    if ($requestNewCourse == 'trueCourse') {
      $data = array("name"=>$_POST['name'],"room"=>$_POST['room'],"teacher"=>$_POST['teacher'],"courseStart"=>$_POST['courseStart'],"courseEnd"=>$_POST['courseEnd'],"schedule"=>$_POST['courseSchedule']);
      insertData($data);
      echo true;
    } else {
      echo false;
    }
    
  }
  
  function insertData($arrData){
    $course->insert($arrData['name'],$arrData['room'],$arrData['teacher'],$arrData['courseStart'],$arrData['courseEnd'],$arrData['schedule']);
  }
  

?>