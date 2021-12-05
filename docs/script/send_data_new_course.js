$(document).ready(function(){

  $('form').submit(function(ev){
    ev.preventDefault();

    var data = $(this).serializeArray();
    /*for(let x of data){
      if(x['name'])
    }*/
    console.log(data);
    data.push({name:'tag',value:'login'});

    $.ajax({
      url:'http://localhost/projects/MYSQL%20PHP/calendario_cursos/php/json.php',
      type:'post',
      dataType:'json',
      data:data
    })
    .done(function(){console.log('Succes')})
    .fail(function(){console.log('Failed')})
    .always(function(){console.log('Completed')});
  });

});
