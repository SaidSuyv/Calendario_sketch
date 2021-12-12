/*
    Esta seccion de abajo, envia la información recopilada
    de todos los inputs del form y los envia a la BD
*/

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

//-------------------------------------------------------------------------------------------------

/*
    Esta funcion agrega los dias en especifico para el horario
    del curso
*/

[document.querySelector('#newCourseStart'),document.querySelector('#newCourseEnd')].forEach(inpDate=>{
    inpDate.onchange = ()=>{
        if(inpDate.value !== '') analize_date_input(inpDate.id,inpDate.value);
    };
});

//-------------------------------------------------------------------------------------------------

/*
    Esta funcion activa los dias que coinciden con los dias de la semana dentro del rango de
    los limites del curso
*/

document.querySelectorAll('.loop').forEach(inp=>{
    inp.onclick = ()=>{
      let free_days = document.querySelectorAll('input.av-day-inp');
      let free_days_hours_inputs = document.querySelectorAll('input.av-day-hour-inp');
  
      if (!inp.checked){
  
        for(let inpFreeD of free_days){
          if(whichDayIsIt(inpFreeD.name) == inp.id){
            inpFreeD.checked = false;
            for(let hoursInp of free_days_hours_inputs){
              if(hoursInp.id.split('_')[0] == inpFreeD.id){
                hoursInp.disabled = true;
              }
            }
          }else{continue;}
        }
  
      }else{
  
        for(let inpFreeD of free_days){
          if(whichDayIsIt(inpFreeD.name) == inp.id){
            inpFreeD.checked = true;
            for(let hoursInp of free_days_hours_inputs){
              if(hoursInp.id.split('_')[0] == inpFreeD.id){
                hoursInp.disabled = false;
              }
            }
          };
        }
  
      }
    };
});

//-------------------------------------------------------------------------------------------------

$('#selectLoop').click(function(ev){
    ev.preventDefault();
    if(ev.target.tagName == 'OPTION'){

        switch(ev.target.value){

            case 'everyday':
                console.log(its_pressed);
                if(its_pressed){ 
                    $('#customBtnSelect').click(function(e){
                        console.log(e);
                    });
                    //$('#customLoop').removeClass('show');
                    its_pressed = false;
                }
                break;
            case 'no-day':
                $('#customLoop').toggleClass('show');
                break;
            case 'detailed':
                its_pressed = true;
                break;

        }

    }
});