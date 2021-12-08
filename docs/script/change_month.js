var yr = 0;
var mnth = 0;

document.querySelectorAll('div.titulo-del-cuadro i.fas').forEach(arrow=>{

  arrow.addEventListener('click',(e)=>{

    switch (true) {
      case e.target.className.includes('left'):
        if((month + mnth) != 0){
          mnth--;
          $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
            function(infoCourses){
              renderCalendar(yr,mnth,infoCourses);
            }
          );
        }else{
          yr--;
          mnth = 0;
          $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
            function(infoCourses){
              renderCalendar(yr,mnth,infoCourses);
            }
          );
        }
        break;
      case e.target.className.includes('right'):
        if((month + mnth) != 11){
          mnth++;
          $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
            function(infoCourses){
              renderCalendar(yr,mnth,infoCourses);
            }
          );
        }else{
          yr++;
          mnth = -11;
          $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
            function(infoCourses){
              renderCalendar(yr,mnth,infoCourses);
            }
          );
        }
        break;
    }

  });

});
