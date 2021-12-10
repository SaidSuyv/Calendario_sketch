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
        success: function () {
            getAPIDinamicDate(date);
        }
    });
    
}