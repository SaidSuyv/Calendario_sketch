$(document).ready(function(){

  $('form').submit(function(ev){
    ev.preventDefault();

    let inputs_new_course = document.querySelectorAll('.new-course-form');

    let data = {
      name:inputs_new_course[0].value,
      room:inputs_new_course[3].value,
      teacher:inputs_new_course[4].value,
      courseStart:inputs_new_course[1].value,
      courseEnd:inputs_new_course[2].value,
      courseSchedule:separateDatesData(inputs_new_course),
      verify:'algo'
    };

    $.ajax({
      url:'http://localhost/projects/MYSQL%20PHP/calendario_cursos/index.php',
      type:'post',
      dataType:'json',
      data:data
    })
    .done(function(){console.log('Succes')})
    .fail(function(){console.log('Failed')})
    .always(function(){console.log('Completed')});
  });

});


function separateDatesData(nodeList){

  let arrayDates = [];

  for(let inputSwitch of nodeList){
    if(inputSwitch.checked){
      let inpDate = inputSwitch.getAttribute('data-date').split('/').reverse();
      let objInp = {year:inpDate[0],month:inpDate[1],date:inpDate[2]};

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

  return (arrayDates > 0) ? arrayDates : null;

}
