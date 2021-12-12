$('.cuadros-mes').click(function(ev){
    console.log('works');
    switch(ev.target.tagName){
        case 'DIV':
            getAPIForCoursesListation({action:'forDayList',data:{element:ev.target,tagName:'DIV'}});
            break;
        case 'P':
            getAPIForCoursesListation({action:'forDayList',data:{element:ev.target.parentElement,tagName:'P'}});
            break;
    }
});