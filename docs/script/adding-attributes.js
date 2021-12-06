let test2 = document.querySelector('#PRUEBA');

console.log(test2);

function edit_courses(date_cur_element){

  let courses_for_day = [];
  let course_name;

  for(let course of db){

    course_name = course['name'];

    for(let available_day of course['days-availables']){

      if(
        date_cur_element.toLocaleDateString("en-US",{day:'numeric'}) == available_day['date'] &&
        date_cur_element.toLocaleDateString("en-US",{month:'long'}) == available_day['month'] &&
        date_cur_element.toLocaleDateString("en-US",{year:'numeric'}) == available_day['year']
      ){
        courses_for_day.push(course_name);
        break;
      }

    }

  }

  return courses_for_day;

}
