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

/*

  A continuacion, el codigo para que pueda funcionar correctamente la seleccion de loop
  tanto en moviles como en computadoras

*/

$('#selectLoop').change(function(ev){
  
  switch(ev.target.value){

    case 'everyday':
      $('#everyDayBTN').click();
      break;

    case 'no-day':
      $('#noDayBTN').click();
      loopNoDay();
      break;
    
    case 'custom':
      $('#customBTN').click();
      loopCustom();
      break;

  }

});

//----- FUNCIONES CODIGO LOOP -------

function loopNoDay(){

  let inputs_switch = document.querySelectorAll('input.av-day-inp');
  let inputs_hours = document.querySelectorAll('input.av-day-hour-inp');

  for(let input of [inputs_switch, inputs_hours]){

    for(let inp of input){

      switch(inp.type){

        case 'checkbox':
          inp.checked = false;
          break;
        case 'time':
          inp.disabled = true;
          break;

      }

    }

  }

  //------------------

  let loopInputs = document.querySelectorAll('input[name="loopDay"]');
  let loopInputsHours = [document.querySelectorAll('input[name="allHourStart"]'),document.querySelectorAll('input[name="allHourEnd"]')];

  loopInputs.forEach(inp=>{
    inp.checked = false;

    for(let inputs of loopInputsHours){

      for(let inputsHour of inputs){

        if(inputsHour.getAttribute('data-day') == inp.getAttribute('data-day')){
          inputsHour.disabled = true;
          break;
        }

      }

    }
  });

  loopInputsHours.forEach(hourInpArr=>{

    hourInpArr.forEach(input=>{

      input.value = '';

    });

  });

  document.querySelectorAll('input.av-day-inp').forEach(inputs=>{
    if(inputs.checked){
      inputs.click();
    }
  });

  document.querySelectorAll('input.av-day-hour-inp').forEach(inp=>{
    inp.value = '';
  });
  

}

function loopCustom(){

  let loopInputs = document.querySelectorAll('input[name="loopDay"]');
  let loopInputsHours = [document.querySelectorAll('input[name="allHourStart"]'),document.querySelectorAll('input[name="allHourEnd"]')];

  loopInputs.forEach(inputs=>{

    inputs.addEventListener('click',function(ev){

      if(ev.target.checked) {

        for(let inputs of loopInputsHours){

          for(let inputsHour of inputs){

            if(inputsHour.getAttribute('data-day') == ev.target.getAttribute('data-day')){
              inputsHour.disabled = false;
              break;
            }
  
          }

        }

        checked_inputs(ev.target.getAttribute('data-day'),'check');
      }
      else {

        for(let inputs of loopInputsHours){

          for(let inputsHour of inputs){

            if(inputsHour.getAttribute('data-day') == ev.target.getAttribute('data-day')){
              inputsHour.value = '';
              inputsHour.disabled = true;
              break;
            }
  
          }

        }

        checked_inputs(ev.target.getAttribute('data-day'),'uncheck');
      }

    });

  });

  loopInputsHours.forEach(hourInpArr=>{

    hourInpArr.forEach(input=>{

      input.addEventListener('change',function(ev){

        console.log(ev.target.value);

        let hourParam;

        if(ev.target.name.includes('Start')){
          hourParam = 'Start';
        }else if( ev.target.name.includes('End') ){
          hourParam = 'End';
        }

        change_input(ev.target.getAttribute('data-day'),hourParam,ev.target.value);

      });

    });

  });

}

function change_input(data,param,val){

  let inputs_dias_dispo = document.querySelectorAll('input.av-day-hour-inp');

  switch(param){
    
    case 'Start':

      for(let inp of inputs_dias_dispo){

        if(inp.id.includes('Start')){

          let date_inp = new Date(
            parseInt(inp.getAttribute('data-date').split('/')[2]),
            parseInt(inp.getAttribute('data-date').split('/')[1]) - 1,
            parseInt(inp.getAttribute('data-date').split('/')[0])
          ).getDay();

          if( whichDayIsIt(date_inp) == data ){

            inp.value = val;

          }

        }

      }

      break;

    case 'End':

      for(let inp of inputs_dias_dispo){

        if(inp.id.includes('End')){

          let date_inp = new Date(
            parseInt(inp.getAttribute('data-date').split('/')[2]),
            parseInt(inp.getAttribute('data-date').split('/')[1]) - 1,
            parseInt(inp.getAttribute('data-date').split('/')[0])
          ).getDay();

          if( whichDayIsIt(date_inp) == data ){

            inp.value = val;

          }

        }

      }
      
      break;

  }

}

function checked_inputs(data,status){
  
  let inputs_dias_dispo = document.querySelectorAll('input.av-day-inp');
  
  switch(status){
    
    case 'check':
      
      for(let inp of inputs_dias_dispo){

        let date_inp = new Date(
          parseInt(inp.getAttribute('data-date').split('/')[2]),
          parseInt(inp.getAttribute('data-date').split('/')[1]) - 1,
          parseInt(inp.getAttribute('data-date').split('/')[0])
        ).getDay();
        
        if(whichDayIsIt(date_inp) == data){

          inp.click();
        }  
      
      }
      
      break;
      
    case 'uncheck':

      for(let inp of inputs_dias_dispo){

        let date_inp = new Date(
          parseInt(inp.getAttribute('data-date').split('/')[2]),
          parseInt(inp.getAttribute('data-date').split('/')[1]) - 1,
          parseInt(inp.getAttribute('data-date').split('/')[0])
        ).getDay();
        
        if(whichDayIsIt(date_inp) == data){

          inp.click();
        }  
      
      }

      break;
    
  }
  
}