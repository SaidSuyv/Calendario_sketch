function renderCalendar(...f){

    printMonth(new Date(year + f[0],month + f[1]));
  
    let i = 0;
    let prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
    let weekDay = whichDayIsIt(prevLastDay.toString());
  
    while(weekDay != 'Mon'){
  
      if(weekDay == 'Sun'){ i++; break;}
      i--;
      prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
      weekDay = whichDayIsIt(prevLastDay.toString());
  
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
      element.setAttribute('data-el-date',dateForDiv.toLocaleDateString());
  
      let day_courses = if_there_are_courses_that_day(dateForDiv,f[2],element);

      i++;
      prevLastDay = new Date(year + f[0], month + f[1], i).getDate();
  
    }
  
  }

getAPIToday();