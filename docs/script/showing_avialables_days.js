[document.querySelector('#courseStart'),document.querySelector('#courseEnd')].forEach(inp=>{
  inp.onchange=()=>{
    if(inp.value !== '') analizing(inp.id,inp.value);
    else console.log(false);
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

  console.log(limits);

  if(Object.keys(limits).length == 2){
    send_days(limits);
  }
}

function send_days(limites){
  let dateStart = limites['start'][2];
  let dayAlreadyWrote = false;

  while(new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString() != new Date(parseInt(limites['end'][0]),parseInt(limites['end'][1])-1,parseInt(limites['end'][2])+1).toLocaleDateString()){

    let currentMonth = new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1]) - 1,parseInt(dateStart)).toLocaleDateString("en-US",{month:'long'});

    let day_htmlElement = `
    <div class="av-day my-3 container d-flex justify-content-around align-items-center flex-wrap gy-3">

      <div class="form-check form-switch">
        <input class="form-check-input av-day-inp" type="checkbox" role="switch" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}" name='{"year":"${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getFullYear()}","month":"${currentMonth}","date":"${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}"}' checked>
        <label class="form-check-label" for="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}">${currentMonth} ${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}</label>
      </div>

      <div class="hours-inp d-flex gx-3 align-items-center">

        <div>
          <input type="time" class="form-time-input" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourStart" name="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourStart">
        </div>
        <div class="mx-3"><p class="m-auto">-</p></div>
        <div>
          <input type="time" class="form-time-input" id="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourEnd" name="${currentMonth}${new Date(parseInt(limites['start'][0]),parseInt(limites['start'][1])-1,dateStart).getDate()}_hourEnd">
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
}

//-----------------------------------

document.querySelectorAll('.loop').forEach(inp=>{
  inp.onclick = ()=>{
    if (!inp.checked){
      var free_days = document.querySelectorAll('input.av-day-inp');
      console.log(free_days);
    }
  };
});