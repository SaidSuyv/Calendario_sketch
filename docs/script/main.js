const monthName = document.querySelector('.titulo-del-cuadro h1');
const dias = document.querySelectorAll('div.cuadros-mes div.dia');

var today = new Date();
today = [today.getFullYear(),today.getMonth(),today.getDate()];
var date = new Date();
monthName.innerHTML = date.toLocaleDateString("en-US", {month:'long'});

var month = date.getMonth();
var year = date.getFullYear();
const days = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'}

//------------------

//------------------------
function ndeah(dayNum){ for(let day in days) if(dayNum == day) return days[day]; }

function changeMonth(fecha){

  if (fecha.getFullYear() == today[0]) monthName.innerHTML = fecha.toLocaleDateString("en-US", {month:'long'});
  else monthName.innerHTML = fecha.toLocaleDateString("en-US", {month:'long', year:'numeric'});

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

    let ele = new Date(year + f[0], month + f[1], i);
    ele = [ele.getFullYear(),ele.getMonth(),ele.getDate()];

    if(ele[1] != current_month) element.classList.add('out-of-month');
    else element.classList.remove('out-of-month');

    if(ele[0] == today[0] && ele[1] == today[1] && ele[2] == today[2]) element.classList.add('today');
    else element.classList.remove('today');

    element.children[0].innerHTML = prevLastDay;

    let dateForDiv = new Date(year + f[0], month + f[1], i);
    element.setAttribute('data-el-date',[dateForDiv.toLocaleDateString("en-US",{year:'numeric'}),dateForDiv.getMonth(),dateForDiv.toLocaleDateString("en-US",{day:'numeric'})]);
    
    let day_courses = edit_courses(new Date(year + f[0], month + f[1], i),f[2]);

    if(day_courses.length > 0){
      element.setAttribute('data-has-courses','true');
      element.setAttribute('data-courses-list',day_courses.join(','));
      element.innerHTML += '<div class="courses m-auto mb-1"></div>';
    }else{
      element.setAttribute('data-has-courses','false');
      element.removeAttribute('data-courses-list');
      if(element.children.length > 1) element.removeChild(element.children[1]);
    }
    i++;
    prevLastDay = new Date(year + f[0], month + f[1], i).getDate();

  }

}

var ndeah2;

async function getAPI(){
  fetch('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php')
  .then(data=>data.json())
  .then(data=>{
    ndeah2 = data;
    console.log(ndeah2);
    renderCalendar(0,0,ndeah2);
  })
}

getAPI();

//-----------------------------------------------------------------------------------------
