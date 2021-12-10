
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

  return arrayDates;

}

$(document).ready(function(){

  $('#offcanvasNewCourse').submit(function(ev){
    ev.preventDefault();

    let inputs_new_course = document.querySelectorAll('.new-course-form');

    var data = new FormData();
    data.append('name',inputs_new_course[0].value);
    data.append('room',inputs_new_course[3].value);
    data.append('teacher',inputs_new_course[4].value);
    data.append('courseStart',inputs_new_course[1].value);
    data.append('courseEnd',inputs_new_course[2].value);
    data.append('courseSchedule',JSON.stringify(separateDatesData(inputs_new_course)));
    $.ajax({
      url:`http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/php/setData.php?action=insert`,
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
