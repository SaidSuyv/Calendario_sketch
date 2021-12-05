var alreadyLoad = false;

$('.cuadros-mes').click(function(ev){
  let parentDiv;
  if((ev.target.tagName == 'DIV' || ev.target.tagName == 'P' ) && (ev.target.className.includes('dia') || ev.target.className.includes('texto-dia') )){
    switch (ev.target.tagName) {
      case 'DIV':
        parentDiv = ev.target;
        process(parentDiv);
        break;
      case 'P':
        parentDiv = ev.target.parentElement;
        process(parentDiv);
        break;
    }
  }
});

function process(eventToLoad){
  if(eventToLoad.getAttribute('data-has-courses') == 'true'){

    let currentDateDiv = eventToLoad.getAttribute('data-el-date').split(',');
    let coursesList = edit_courses(new Date(parseInt(currentDateDiv[0]),parseInt(currentDateDiv[1]),parseInt(currentDateDiv[2])));
    if(coursesList.length > 0) {
      let ind = 1;
      for(let courseForDay of coursesList){
        for(let courseDB of db){
          if(courseDB['name'] == courseForDay){
            drawCourse(courseDB,ind);
          }
          ind++;
        }
      }
      alreadyLoad = false;
    }
    else console.log('NOP');
  }else{
    sendNoCourses();
  };

}

function drawCourse(curso,count){

  let cursoPlantilla = `
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${count}" aria-expanded="false" aria-controls="flush-collapseOne">
        ${curso.name}
      </button>
    </h2>
    <div id="flush-collapse${count}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">

        <div class="row">

          <div class="col-6">

            <p> <b>Schedule:</b> ${curso.course_start} - ${curso.course_end}</p>

            <p> <b>Teacher:</b> ${curso.teacher}</p>

          </div>
          <div class="col-6">

            <p> <b>Room:</b> ${curso.room}</p>

          </div>

        </div>

      </div>
    </div>
  </div>
  `;

  if(!alreadyLoad){
    document.querySelector('#accordionCourses').innerHTML = cursoPlantilla;
    alreadyLoad = true;
  }else{
    document.querySelector('#accordionCourses').innerHTML += cursoPlantilla;
  }
}

function sendNoCourses(){

  let noCourses = `<h3 style="text-align:center">There are no courses for today</h3>`;
  document.querySelector('#accordionCourses').innerHTML = noCourses;
}
