$(document).ready(function(){

    $('#deleteCourseForm').submit(function(ev){
        ev.preventDefault();
    
        let dataNotProcessed = $(this).serializeArray();
        let courses = [];
        var data = new FormData();
    
        for(let course of dataNotProcessed){
          courses.push(course.name);
        }
    
        data.append('courses',courses);
    
        setAPIDinamicDate([yr,mnth],data,'delete');
    
      });

});