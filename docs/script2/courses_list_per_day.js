$('.cuadros-mes').click(function(ev){
    
    switch(ev.target.tagName){
        case 'DIV':
            getAPIForCoursesListation({action:'forDayList',data:{element_date:ev.target,tagName:'DIV'}});
            break;
        case 'P':
            getAPIForCoursesListation({action:'forDayList',data:{element_date:ev.target.parentElement,tagName:'P'}});
            break;
    }
    
});