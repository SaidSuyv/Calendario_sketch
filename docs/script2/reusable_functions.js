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
    for(let day in days) if(dayNum == day) return days[day];

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