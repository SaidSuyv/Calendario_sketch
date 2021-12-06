var yr = 0;
var mnth = 0;

document.querySelectorAll('div.titulo-del-cuadro i.fas').forEach(arrow=>{

  arrow.addEventListener('click',(e)=>{

    switch (true) {
      case e.target.className.includes('left'):
        if((month + mnth) != 0){
          mnth--;
          fetch('url')
          .then(data=>data.json())
          .then(data=>{
            renderCalendar(yr,mnth,data);
          });
        }else{
          yr--;
          mnth = 0;
          fetch('url')
          .then(data=>data.json())
          .then(data=>{
            renderCalendar(yr,mnth,data);
          });
        }
        break;
      case e.target.className.includes('right'):
        if((month + mnth) != 11){
          mnth++;
          fetch('url')
            .then(data => data.json())
            .then(data => {
              renderCalendar(yr, mnth, data);
            });
        }else{
          yr++;
          mnth = -11;
          fetch('url')
            .then(data => data.json())
            .then(data => {
              renderCalendar(yr, mnth, data);
            });
        }
        break;
    }

  });

});
