[document.querySelector('#courseStart'),document.querySelector('#courseEnd')].forEach(inp=>{
  inp.onchange=()=>{
    if(inp.value !== '') analizing(inp.id,inp.value);
  };
});

var limits = {};

function analizing(id,value){
  switch (id) {
    case 'courseStart':
      limits['start'] = value.split('-');
      break;
    case 'courseEnd':
      limits['end'] = value.split('-');
      break;
  }

  if(Object.keys(limits).length == 2){
    send_days(limits);
  }
}

function send_days(limites){
  let dateStart = limites['start'][2];
  let dayAlreadyWrote = false;

  if(
    parseInt(limites['end'][0]) >= parseInt(limites['start'][0]) &&
    parseInt(limites['end'][1]) >= parseInt(limites['start'][1]) &&
    parseInt(limites['end'][2]) >= parseInt(limites['start'][2])
  ){
    while(new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString() != new Date(parseInt(limites['end'][0]),parseInt(limites['end'][1])-1,parseInt(limites['end'][2])+1).toLocaleDateString()){

      let currentMonth = new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString("en-US",{month:'long'});

      let day_htmlElement = `
      <div class="av-day my-3 container d-flex justify-content-around align-items-center flex-wrap gy-3">

        <div class="form-check form-switch">
          <input class="form-check-input av-day-inp new-course-form" type="checkbox" role="switch" data-date="${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}" name='${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDay()}' checked onclick="disableHours(event)">
          <label class="form-check-label" for="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}">${currentMonth} ${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}</label>
        </div>

        <div class="hours-inp d-flex gx-3 align-items-center">

          <div>
            <input type="time" class="form-time-input av-day-hour-inp new-course-form" data-date="${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourStart" name="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourStart">
          </div>
          <div class="mx-3"><p class="m-auto">-</p></div>
          <div>
            <input type="time" class="form-time-input av-day-hour-inp new-course-form" data-date="${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).toLocaleDateString()}" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourEnd" name="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourEnd">
          </div>

        </div>

      </div>
      `;

      if(!dayAlreadyWrote) {
        document.querySelector('.available-days').innerHTML = day_htmlElement;
        dayAlreadyWrote = true;
      }else document.querySelector('.available-days').innerHTML += day_htmlElement;
      dateStart++;
    }
    document.querySelectorAll('.loop').forEach(inp=>{inp.checked=false});
    document.querySelectorAll('input.av-day-inp').forEach(inp=>{inp.checked=false});
    document.querySelectorAll('input.av-day-hour-inp').forEach(inp=>{inp.disabled=true});
  }else{alert('Please choose a correct interval of dates')};
}

//-----------------------------------

document.querySelectorAll('.loop').forEach(inp=>{
  inp.onclick = ()=>{
    let free_days = document.querySelectorAll('input.av-day-inp');
    let free_days_hours_inputs = document.querySelectorAll('input.av-day-hour-inp');

    if (!inp.checked){

      for(let inpFreeD of free_days){
        if(ndeah(inpFreeD.name) == inp.id){
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
        if(ndeah(inpFreeD.name) == inp.id){
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

function disableHours(evt){
  let inp = evt.target;
  let free_days_hours_inputs = document.querySelectorAll('input.av-day-hour-inp');

  if(!inp.checked){
    console.log(inp);
    for(let hoursInp of free_days_hours_inputs){
      if(hoursInp.getAttribute('data-date') == inp.getAttribute('data-date')){
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
