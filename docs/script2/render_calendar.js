function renderCalendar(...f){

    // Muestra el mes actual
    printMonth(new Date(year + f[0],month + f[1]));
  
    let i = 0;
    // Obtiene el ultimo dia del mes anterior al actual
    let prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
    // Verifica que dia es
    let weekDay = whichDayIsIt(prevLastDay.toString());
  
    // Mientras no se Lunes, retrocede un dia hasta que sea lunes
    while(weekDay != 'Mon'){
  
      if(weekDay == 'Sun'){ i++; break;}
      i--;
      prevLastDay = new Date(year + f[0], month + f[1], i).getDay();
      weekDay = whichDayIsIt(prevLastDay.toString());
  
    }
  
    prevLastDay = new Date(year + f[0], month + f[1], i).getDate();
  
    let current_month = month + f[1];
  
    // Empieza con el primer dia
    for(let element of dias){
  
      let ele = new Date(year + f[0], month + f[1], i);
      ele = [ele.getFullYear(),ele.getMonth(),ele.getDate()];
  
      // Si el mes del dia objetivo del calendario no es igual al mes actual, establecer como "fuera del mes"
      // Si no, retira lo establecido
      if(ele[1] != current_month) element.classList.add('out-of-month');
      else element.classList.remove('out-of-month'); 
  
      // Si el dia objetivo es hoy, establecer como "hoy", sino, retira lo establecido
      if(ele[0] == today[0] && ele[1] == today[1] && ele[2] == today[2]) element.classList.add('today');
      else element.classList.remove('today');
  
      element.children[0].innerHTML = prevLastDay;  // Muestra el dia objetivo
  
      let dateForDiv = new Date(year + f[0], month + f[1], i);
      element.setAttribute('data-el-date',dateForDiv.toLocaleDateString()); // Deja la informacion del dia en el elemento
  
      let day_courses = if_there_are_courses_that_day(dateForDiv,f[2],element);

      i++;
      prevLastDay = new Date(year + f[0], month + f[1], i).getDate();
  
    }
  
  }

getAPIToday();