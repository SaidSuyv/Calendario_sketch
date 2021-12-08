$('#buttonDeleteCourse').click(function(ev){

  $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
    function(courses){
      if(courses.length < 1){
        document.querySelector('#accordionCoursesForDelete').innerHTML = "<h4 class='centered'>There are no courses for deleting</h4>";
        document.querySelector('#submitDeletedCourses').disabled = true;
      }else{document.querySelector('#submitDeletedCourses').disabled = false;}
      let courseTemplate;
      let alreadyLoadedCourse = false;
      let i = 1;

      for(let course of courses){

        courseTemplate = `
        <div class="accordion-item my-3">

          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
              ${course['name']}
            </button>
          </h2>
          <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionCoursesForDelete">
            <div class="accordion-body">

              <div class="row row-cols-2">
                <div class="col"> <p><b>Schedule: </b>${course['course_start']} <b>-</b> ${course['course_end']}</p> </div>
                <div class="col"> <p><b>Room: </b>${course['room']}</p> </div>
                <div class="col"> <p><b>Teacher:</b> ${course['teacher']}</p> </div>
                <div class="col"> <input type="checkbox" class="form-check-input" name="${course['name']}"> <span>Delete this</span></div>
              </div>

            </div>

          </div>

        </div>
        `;

        if(!alreadyLoadedCourse){
          document.querySelector('#accordionCoursesForDelete').innerHTML = courseTemplate;
          alreadyLoadedCourse = true;
        }
        else{
          document.querySelector('#accordionCoursesForDelete').innerHTML += courseTemplate;
        }

        i++;

      }

    }
  );

});

//-----------------------------------------------------------------------

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

    $.ajax({
      url:`http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/php/setData.php?action=delete`,
      type:'post',
      data: data,
      processData:false,
      contentType:false,
      success:function(){
        getAPIToday();
      }
    });

  });

});
