/*
    Esta funcion sirve para regresar los nombres de cada
    curso vinculados al dia recibido

    date_cur_element : Fecha dinamica
    db : array con los cursos
    return : [curso.name,curso.name]

    además añade atributos data con estos datos

    data-has-courses : true/false
    data-courses-list : [curso.name,curso.name,...]
*/

function if_there_are_courses_that_day(date_cur_element,db,element){

    let courses_for_day = [];
    let course_name;
  
    for(let course of db){
  
      course_name = course.name;
  
      let schedule = JSON.parse(course.course_schedule);
  
      for(let schedule_day of schedule){
        if(
          date_cur_element.getDate().toString() == schedule_day.date &&
          date_cur_element.toLocaleDateString("en-US",{month:'long'}) == schedule_day.month &&
          date_cur_element.getFullYear().toString() == schedule_day.year
        ){
          courses_for_day.push(course_name);
          break;
        }
      }
  
    }
    
    if(courses_for_day.length > 0){

        element.setAttribute('data-has-courses','true');
        element.setAttribute('data-courses-list', courses_for_day.join(','));

        if(element.children.length > 1) element.removeChild(element.children[1]);
        element.innerHTML += '<div class="courses m-auto mb-1"></div>';

    }  else{

        element.setAttribute('data-has-courses','false');
        element.removeAttribute('data-courses-list');

        if(element.children.length > 1) element.removeChild(element.children[1]);

    }

}

//------------------------------------------------------------------------------------

/* 
    Esta funcion al ser llamada pide un argumento (dia en numero) y regresa un string con
    el dia especificado segun el numero enviado.

    dias = {0: 'Sun',1: 'Mon',2: 'Tue',3: 'Wed',4: 'Thu',5: 'Fri',6: 'Sat',}

    si el argumento es 3, regresa 'Wed' que quiere decir que es Miercoles.
*/

function whichDayIsIt(dayInNumber){

    let days = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};
    for(let day in days) if(dayInNumber == day) return days[day];

}

//------------------------------------------------------------------------------------

/* 
    Esta funcion al ser llamada pide un argumento (fecha actual) y imprime el mes en el
    se encuentra el usuario a petición en el titulo del calendario
*/

function printMonth(date){

    if (date.getFullYear() == today[0]) monthName.innerHTML = date.toLocaleDateString("en-US", {month:'long'});
    else monthName.innerHTML = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});

}

//------------------------------------------------------------------------------------

/*
  Esta funcion recoge todas la informacion y la regresa de manera de JSON stringified para que se pueda mandar
  correctamente
*/

function separateDatesData(nodeList){

  let arrayDates = [];

  for(let inputSwitch of nodeList){

    if(inputSwitch.checked){

      let inpDate = inputSwitch.getAttribute('data-date').split('/').reverse().map(num=>{return parseInt(num)});
      let objInp = {year:inpDate[0],month:new Date(inpDate[0],inpDate[1]-1,inpDate[2]).toLocaleDateString("en-US",{month:'long'}),date:inpDate[2]};
      
      for(let inputHours of nodeList){

        if(inputHours.className.includes('form-time-input')){
          
          if(inputHours.getAttribute('data-date') == inputSwitch.getAttribute('data-date')){
            
            switch (inputHours.name.split('_')[1]) {
              case 'hourStart':
                objInp['hourStart'] = inputHours.value;
                break;
              case 'hourEnd':
                objInp['hourEnd'] = inputHours.value;
                break;
            }

          }

        }

      }
      arrayDates.push(objInp);
    }
    
  }

  return JSON.stringify(arrayDates);

}

//------------------------------------------------------------------------------------

/*
  Esta funcion mandar cada div para la lista de dias disponibles al añadir o editar un curso
*/

function send_data_for_available_days(limitsOfCourse){

  let dateStart = limitsOfCourse['start'][2];

  if(
    parseInt(limitsOfCourse['end'][0]) >= parseInt(limitsOfCourse['start'][0]) &&
    parseInt(limitsOfCourse['end'][1]) >= parseInt(limitsOfCourse['start'][1]) &&
    parseInt(limitsOfCourse['end'][2]) >= parseInt(limitsOfCourse['start'][2])
  ){
    while(new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString() != new Date(parseInt(limitsOfCourse['end'][0]),parseInt(limitsOfCourse['end'][1])-1,parseInt(limitsOfCourse['end'][2])+1).toLocaleDateString()){

      let currentMonth = new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString("en-US",{month:'long'});

      let day_htmlElement = `
      <div class="av-day my-3 container d-flex justify-content-around align-items-center flex-wrap gy-3">

        <div class="form-check form-switch">
          <input class="form-check-input av-day-inp new-course-form" type="checkbox" role="switch" data-date="${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}" name='${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDay()}' checked onclick="disableHours(event)">
          <label class="form-check-label" for="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}">${currentMonth} ${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}</label>
        </div>

        <div class="hours-inp d-flex gx-3 align-items-center">

          <div>
            <input type="time" class="form-time-input av-day-hour-inp new-course-form" data-date="${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}_hourStart" name="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}_hourStart">
          </div>
          <div class="mx-3"><p class="m-auto">-</p></div>
          <div>
            <input type="time" class="form-time-input av-day-hour-inp new-course-form" data-date="${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}_hourEnd" name="${currentMonth}${new Date(parseInt(limitsOfCourse['start'][0]),parseInt(limitsOfCourse['start'][1])-1,dateStart).getDate()}_hourEnd">
          </div>

        </div>

      </div>
      `;

      if(!dayAlreadyWrote) {
        document.querySelector('.available-days-new-course').innerHTML = day_htmlElement;
        dayAlreadyWrote = true;
      }else document.querySelector('.available-days-new-course').innerHTML += day_htmlElement;
      dateStart++;
    }
    dayAlreadyWrote = false;
    document.querySelectorAll('.loop').forEach(inp=>{inp.checked=false});
    document.querySelectorAll('input.av-day-inp').forEach(inp=>{inp.checked=false});
    document.querySelectorAll('input.av-day-hour-inp').forEach(inp=>{inp.disabled=true});
  }else{alert('Please choose a correct interval of dates')};

}

/*
  Esta funcion es para analizar los dias limitsOfCourse para mandar cada uno de los dias
  disponibles al añadir un curso
*/

function analize_date_input(id,value){

  switch (id) {
    case 'newCourseStart':
      limites['start'] = value.split('-');
      break;
    case 'newCourseEnd':
      limites['end'] = value.split('-');
      break;
  }

  if(Object.keys(limites).length == 2){
    send_data_for_available_days(limites);
  }

}

//------------------------------------------------------------------------------------

/*
  Esta funcion es para desactivar el dia dentro del rango del curso para que ese dia en
  especifico no sea almacenado
*/

function disableHours(evt){
  let inp = evt.target;
  let free_days_hours_inputs = document.querySelectorAll('input.av-day-hour-inp');

  if(!inp.checked){
    for(let hoursInp of free_days_hours_inputs){
      if(hoursInp.getAttribute('data-date') == inp.getAttribute('data-date')){
        hoursInp.value = '';
        hoursInp.disabled = true;
      }
    }

  }else{
    for(let hoursInp of free_days_hours_inputs){
      if(hoursInp.getAttribute('data-date') == inp.getAttribute('data-date')){
        hoursInp.disabled = false;
      }
    }
  }
}

//------------------------------------------------------------------------------------

/*

  Esta funcion regresa el mes en numero

*/

function whichMonthIsIt(monthStr){

  let arrMonths = {
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

  for(let monthObj in arrMonths){

    if(monthObj == monthStr){
      return arrMonths[monthObj];
    }

  };

}

//------------------------------------------------------------------------------------


/* ESTA FUNCION VERIFICA QUE CURSOS ESTAN ASIGNADOS AL DIA */

function cursos_coinciden_dia_actual(lista_de_cursos, fecha_actual){

  let cursos_que_coinciden = [];

  for(let curso of lista_de_cursos){  // for por curso

    let dias_disponibles = JSON.parse(curso.course_schedule);   // se obtiene el listado de dias

    for(let dia of dias_disponibles){   // verificacion por dia
 
      let mes_fecha_curso = whichMonthIsIt(dia.month) + 1;

      if(

        dia.date == fecha_actual[0] &&
        mes_fecha_curso == fecha_actual[1] &&
        dia.year == fecha_actual[2]

      ){

        cursos_que_coinciden.push(curso);
        break;

      }
      
    }

  }

  return cursos_que_coinciden;

}


//------------------------------------------------------------------------------------

/*
  Esta funcion es para procesar el listado de dias que se agregaran por
  el dia clickeado en el calendario mostrando la lista de cursos
*/

function processDay(dataElement,coursesObj){

  let curDateDiv = dataElement['element_date'].getAttribute('data-el-date').split('/');

  let arrCursosDiaActual = cursos_coinciden_dia_actual(coursesObj,curDateDiv);
  
  /* Pone el dia en el offcanvas */

  $('#offcanvasLabel_coursesList').html(
    new Date(
      parseInt(curDateDiv[2]),
      parseInt(curDateDiv[1]) - 1,
      parseInt(curDateDiv[0])
    ).toLocaleDateString("en-US",{month:'long'}) + ' ' + curDateDiv[0] + ', ' + curDateDiv[2]
  )

  console.log(curDateDiv,coursesObj); 
  
  //---------------------------------------------------------------------

  let containerAccordion = document.querySelector('#accordionCourses');
  let n = 1;
  let first = false;

  if(arrCursosDiaActual.length != 0){

    for(let course of arrCursosDiaActual){

      let accordionItem = `
    <div class="accordion-item">
  
      <h2 class="accordion-header" id="course-header-${n}">
  
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${n}" aria-expanded="false" aria-controls="flush-collapse${n}">
          ${course.name}
        </button>
  
      </h2>
  
      <div id="flush-collapse-${n}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionCourses">
              
        <div class="accordion-body">
        
          <div class="row row-cols-2">
          
            <div class="col">
  
              <p><b>Schedule: </b>${course.course_start} - ${course.course_end}</p>
  
            </div>
  
            <div class="col">
  
              <p><b>Teacher: </b>${course.teacher}</p>
  
            </div>
  
            <div class="col">
  
              <p><b>Room: </b>${course.room}</p>
  
            </div>
          
          </div>
  
        </div>
            
      </div>
  
    </div>
    `;
  
    if(!first){
      containerAccordion.innerHTML = accordionItem;
      first = true;
    }else{
      containerAccordion.innerHTML += accordionItem;
    }
  
    n++;
  
    }

  }else{
    containerAccordion.innerHTML = '<h3>There are no courses for today.</h3>';
  }

}