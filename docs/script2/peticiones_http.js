/*

    Esta funcion hace una peticion para renderizar el calendario con la fecha actual

*/

function getAPIToday(){
    $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
      function(info){
        renderCalendar(0,0,info);
      }
    );
}

//-------------------------------------------------------------------------------------

/*
    Esta funcion hace una peticion para renderizar el calendario con fecha dinamica
*/

function getAPIDinamicDate(...date){
    $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
    function(info){
      renderCalendar(date[0],date[1],info);
    }
  ); 
}

//-------------------------------------------------------------------------------------

/*
    Esta funcion envia datos a la BD y actualiza con la fecha actual
*/

function setAPIDinamicDate(date,data,action){

    $.ajax({
        type: "post",
        url: `http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/php/setData.php?action=${action}`,
        data: data,
        processData:false,
        contentType:false,
        success: function (response) {
          if(response == '1'){
            $('#toastMessages').click();
            setTimeout(getAPIDinamicDate(date),1000);
          }else{
            alert('Ha ocurrido un error.');
          }
        }
    });
    
}

//-------------------------------------------------------------------------------------

/*
  Esta funcion pide datos para hacer un listado de los cursos
*/

function getAPIForCoursesListation(objData){
  
  $.getJSON('http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php',
    
    function (courses) {

      //console.log(courses);

      switch(objData.action){

        case 'forDayList':
          processDay(objData.data,courses);
          break;

        case 'ReadOnly':
          break;

      }

    }

  );

}