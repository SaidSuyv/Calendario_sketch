$('#buttonEditCourse').click(function(){
    $.getJSON("http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php",
        function (res) {
          (res.length > 0) ? drawCoursesForEditing(res) : sendNoCourses();  
        }
    );
});

let alreadyLoadEditing = false;

//--------------------------------------------------------

function drawCoursesForEditing(list_courses){
    let count = 0;

    for(let course of list_courses){
        let cursoPlantilla = `
        <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${count}" aria-expanded="false" aria-controls="flush-collapseOne">
            ${course.name}
            </button>
        </h2>
        <div id="flush-collapse${count}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
    
            <div class="row">
    
                <div class="col-6">
    
                <p> <b>Schedule:</b> ${course.course_start} - ${course.course_end}</p>
    
                <p> <b>Teacher:</b> ${course.teacher}</p>
    
                </div>
                <div class="col-6">
    
                <p> <b>Room:</b> ${course.room}</p>
    
                </div>
    
            </div>
    
            <hr>
    
            <button class="btn btn-dark bg-dark m-auto" data-btn-to-edit="${course.name}" type="button" role="button" data-bs-toggle="modal" data-bs-target="#modalEditCourse" onclick='test(${JSON.stringify(course)})'>Edit course</button>
    
            </div>
        </div>
        </div>
        `;
        count++;
    
        if(!alreadyLoadEditing){
            document.querySelector('#accordionCoursesForList').innerHTML = cursoPlantilla;
            alreadyLoadEditing = true;
        }else{
            document.querySelector('#accordionCoursesForList').innerHTML += cursoPlantilla;
        }
    }
    alreadyLoadEditing = false;
}
  
function sendNoCourses(){
  
    let noCourses = `<h3 style="text-align:center">There are no courses for today</h3>`;
    document.querySelector('#accordionCoursesForList').innerHTML = noCourses;

}  
  
//_--------------------------------------------------------------------------------

function txtToMonth(txt) {
    let months = {
        January:0,
        February:1,
        March:2,
        April:3,
        May:4,
        June:5,
        July:6,
        August:7,
        September:8,
        October:9,
        November:10,
        December:11
    };

    for(let month in months){
        if(month == txt){
            console.log(month,txt,months[month]);
            return months[month];
        }else{ continue};
    }
}

let currentCourseName;

function test(tst){
    let inputsForm = document.querySelectorAll('.edit-course-form');
    currentCourseName = tst.name;
    inputsForm[0].value = tst.name;
    inputsForm[1].value = tst.course_start;
    inputsForm[2].value = tst.course_end;
    inputsForm[3].value = tst.room;
    inputsForm[4].value = tst.teacher;

    for(let avDay of JSON.parse(tst.course_schedule)){
        let currentMonth = txtToMonth(avDay.month);
        let day_htmlElement = `
        <div class="av-day my-3 container d-flex justify-content-around align-items-center flex-wrap gy-3">

            <div class="form-check form-switch">
            <input class="form-check-input av-day-inp edit-course-form" type="checkbox" role="switch" data-date="${new Date(avDay.year,currentMonth,avDay.date).toLocaleDateString()}" id="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}" name='${new Date(avDay.year,currentMonth,avDay.date).getDay()}' checked onclick="disableHours(event)">
            <label class="form-check-label" for="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}">${avDay.month} ${new Date(avDay.year,currentMonth,avDay.date).getDate()}</label>
            </div>

            <div class="hours-inp d-flex gx-3 align-items-center">

            <div>
                <input type="time" class="form-time-input av-day-hour-inp edit-course-form" data-date="${new Date(avDay.year,currentMonth,avDay.date).toLocaleDateString()}" id="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}_hourStart" name="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}_hourStart">
            </div>
            <div class="mx-3"><p class="m-auto">-</p></div>
            <div>
                <input type="time" class="form-time-input av-day-hour-inp edit-course-form" data-date="${new Date(avDay.year,currentMonth,avDay.date).toLocaleDateString()}" id="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}_hourEnd" name="${avDay.month}${new Date(avDay.year,currentMonth,avDay.date).getDate()}_hourEnd">
            </div>

            </div>

        </div>
        `;

        

        if(!alreadyLoadEditing){
            document.querySelector('.available-days-edit').innerHTML = day_htmlElement;
            alreadyLoadEditing = true;
        }else{
            document.querySelector('.available-days-edit').innerHTML += day_htmlElement;
        }
    }
    alreadyLoadEditing = false;
}

//---------------------------------------------------------------------------------

$(document).ready(function(){

    $('#updateCourseForm').submit(function(ev){
      ev.preventDefault();
  
      let inputs_edit_course = document.querySelectorAll('.edit-course-form');
  
      var data = new FormData();
      data.append('name',inputs_edit_course[0].value);
      data.append('room',inputs_edit_course[3].value);
      data.append('teacher',inputs_edit_course[4].value);
      data.append('courseStart',inputs_edit_course[1].value);
      data.append('courseEnd',inputs_edit_course[2].value);
      data.append('courseSchedule',JSON.stringify(separateDatesData(inputs_edit_course)));
      data.append('oldName',currentCourseName);

      $.ajax({
        url:`http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/php/setData.php?action=update`,
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