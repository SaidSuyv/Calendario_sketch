var yr = 0;
var mnth = 0;

document.querySelectorAll('div.titulo-del-cuadro i.fas').forEach(element=>{

  element.addEventListener('click',(e)=>{

    switch (true) {
      case e.target.className.includes('left'):
        if((month + mnth) != 0){
          mnth--;
          renderCalendar(yr,mnth);
        }else{
          yr--;
          mnth = 0;
          renderCalendar(yr,mnth);
        }
        break;
      case e.target.className.includes('right'):
        if((month + mnth) != 11){
          mnth++;
          renderCalendar(yr,mnth);
        }else{
          yr++;
          mnth = -11;
          renderCalendar(yr,mnth);
        }
        break;
    }

  });

});
