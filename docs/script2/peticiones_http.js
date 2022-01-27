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

//-------------------------------------------------------------

function make_request_for_courses(dias_calendario){

  $.getJSON("http://192.168.1.117/projects/MYSQL%20PHP/calendario_cursos/index.php",
    function (data) {
      for(let dia of dias_calendario){
        let date_dia = dia.getAttribute('data-el-date').split('/').map(e=>{return parseInt(e)});
        let cursos_coinciden = [];
        for(let curso of data){
          if(curso.group_of_courses != '0'){
            for(let cursos_individuales of curso.elements){
              let curso_date_started = cursos_individuales.started_date.split('-').map(e=>{return parseInt(e)}).reverse();
              let curso_date_ended = cursos_individuales.ended_date.split('-').map(e=>{return parseInt(e)}).reverse();
              if(curso_date_started[1] < curso_date_ended[1] && date_dia[1] == curso_date_started[1]) {
                //console.log('start es meno a end y fecha actual esta en started');
                let dia_end = new Date(curso_date_ended[2],curso_date_ended[1],0).getDate();
                let limite = curso_date_ended[0];
                for(let i = 0; i < limite; i++){
                  curso_date_ended[0] = dia_end;
                  dia_end++;
                }
              }//else console.log('start no es menor a end o fecha actual no esta en started');
              if(curso_date_started[1] < curso_date_ended[1] && date_dia[1] == curso_date_ended[1]){
                //console.log('start es menos a end y fecha actual esta en ended');
                let dia_start = new Date(curso_date_started[2],curso_date_started[1],1).getDate();
                let verifier = new Date(curso_date_started[2], curso_date_started[1],0).getDate();
                let limite = curso_date_started[0];
                do{
                  curso_date_started[0] = dia_start;
                  dia_start-=1;
                  verifier-=1;
                }
                while(verifier != limite);
              }//else console.log('start no es menor a end o fecha actual no esta en ended');
              //console.log(curso_date_started);
              //console.log(curso_date_ended);
              //console.log(date_dia);
              //console.log(cursos_individuales);
              // verifica año
              if(
                (date_dia[2] >= curso_date_started[2] && date_dia[2] <= curso_date_ended[2]) &&
                (date_dia[1] >= curso_date_started[1] && date_dia[1] <= curso_date_ended[1]) &&
                (date_dia[0] >= curso_date_started[0] && date_dia[0] <= curso_date_ended[0])
                ){
                  cursos_coinciden.push(cursos_individuales);
                }
            }
            break;
          }else{
            let curso_date_started = curso.started_date.split('-').map(e=>{return parseInt(e)}).reverse();
              let curso_date_ended = curso.ended_date.split('-').map(e=>{return parseInt(e)}).reverse();
              if(curso_date_started[1] < curso_date_ended[1] && date_dia[1] == curso_date_started[1]) {
                let dia_end = new Date(curso_date_ended[2],curso_date_ended[1],0).getDate();
                let limite = curso_date_ended[0];
                for(let i = 0; i < limite; i++){
                  curso_date_ended[0] = dia_end;
                  dia_end++;
                }
              }
              if(curso_date_started[1] < curso_date_ended[1] && date_dia[1] == curso_date_ended[1]){
                let dia_start = new Date(curso_date_started[2],curso_date_started[1],1).getDate();
                let verifier = new Date(curso_date_started[2], curso_date_started[1],0).getDate();
                let limite = curso_date_started[0];
                do{
                  curso_date_started[0] = dia_start;
                  dia_start-=1;
                  verifier-=1;
                }
                while(verifier != limite);
              }
              //console.log(curso_date_started);
              //console.log(curso_date_ended);
              //console.log(date_dia);
              //console.log(curso);
              // verifica año
              if(
                (date_dia[2] >= curso_date_started[2] && date_dia[2] <= curso_date_ended[2]) &&
                (date_dia[1] >= curso_date_started[1] && date_dia[1] <= curso_date_ended[1]) &&
                (date_dia[0] >= curso_date_started[0] && date_dia[0] <= curso_date_ended[0])
                ){
                  cursos_coinciden.push(curso);
                }
          }
        }

        // añadir el puntito
        if (cursos_coinciden.length > 0) {

          dia.setAttribute('data-has-courses', 'true');
          dia.setAttribute('data-courses-list', cursos_coinciden.join(','));
  
          if (dia.children.length > 1) dia.removeChild(dia.children[1]);
          dia.innerHTML += '<div class="courses m-auto mb-1"></div>';
  
        } else {
  
          dia.setAttribute('data-has-courses', 'false');
          dia.removeAttribute('data-courses-list');
  
          if (dia.children.length > 1) dia.removeChild(dia.children[1]);
  
        }
      }
    }
  );

}