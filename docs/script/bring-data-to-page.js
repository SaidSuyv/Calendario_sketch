function getAPIToday(){
  $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
    function(info){
      renderCalendar(0,0,info);
    }
  );
}
