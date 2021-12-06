function edit_courses(date_cur_element,db){

  let courses_for_day = [];
  let course_name;

  for(let course of db){

    course_name = course['name'];

    let schedule = JSON.parse(course['course_schedule']);

    for(let schedule_day of schedule){
      if(
        date_cur_element.getDate().toString() == schedule_day['date'] &&
        date_cur_element.toLocaleDateString("en-US",{month:'long'}) == schedule_day['month'] &&
        date_cur_element.getFullYear().toString() == schedule_day['year']
      ){
        courses_for_day.push(course_name);
        break;
      }
    }

  }
  return courses_for_day;

}
