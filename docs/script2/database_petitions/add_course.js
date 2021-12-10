$(document).ready(function(){

    $('#addCourseForm').submit(function(ev){
        ev.preventDefault();

        let inputs_new_course = document.querySelectorAll('.new-course-form');

        var data = new FormData();
        data.append('name',inputs_new_course[0].value);
        data.append('room',inputs_new_course[3].value);
        data.append('teacher',inputs_new_course[4].value);
        data.append('courseStart',inputs_new_course[1].value);
        data.append('courseEnd',inputs_new_course[2].value);
        data.append('courseSchedule',separateDatesData(inputs_new_course));

        setAPIDinamicDate([yr,mnth],data,'insert');

    });

});