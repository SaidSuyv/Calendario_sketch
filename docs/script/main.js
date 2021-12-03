const monthName = document.querySelector('.titulo-del-cuadro h1');
const dias = document.querySelectorAll('div.cuadros-mes div.dia p.texto-dia');

var today = new Date();
var date = new Date();
monthName.innerHTML = date.toLocaleDateString("en-US", {month:'long'});

var month = date.getMonth();
var year = date.getFullYear();
const days = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'}

//------------------
function ndeah(dayNum){ for(let day in days) if(dayNum == day) return days[day]; }

function changeMonth(fecha){
  monthName.innerHTML = fecha.toLocaleDateString("en-US", {month:'long'});
}

function renderCalendar(...f){

  changeMonth(new Date(year + f[0],month + f[1]));

  let i = 0;
  let prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
  let weekDay = ndeah(prevLastDay.toString());

  while(weekDay != 'Mon'){

    if(weekDay == 'Sun'){ i++; break;}
    i--;
    prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
    weekDay = ndeah(prevLastDay.toString());

  }

  prevLastDay = new Date(year + f[0], month + f[1], i).getDate();

  let current_month = month + f[1];

  for(let element of dias){

    let ele_month = new Date(year + f[0], month + f[1], i).getMonth();
    if(ele_month != current_month) element.parentElement.classList.add('out-of-month');
    else element.parentElement.classList.remove('out-of-month');

    element.innerHTML = prevLastDay;
    i++;
    prevLastDay = new Date(year + f[0], month + f[1], i).getDate();

  }

}

renderCalendar(0,0);


//-----------------------------------------------------------------------------------------
