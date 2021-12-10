document.querySelectorAll('div.titulo-del-cuadro i.fas').forEach(arrow=>{

    arrow.addEventListener('click',(ev)=>{

        switch(true){
            
            case ev.target.className.includes('left'):

                if( (month + mnth) != 0){
                    mnth--;
                    getAPIDinamicDate(yr,mnth);
                }
                else{
                    yr--;
                    mnth = 0;
                    getAPIDinamicDate(yr,mnth);
                }

                break;

            case ev.target.className.includes('right'):

                if( (month + mnth) != 11 ){
                    mnth++;
                    getAPIDinamicDate(yr,mnth);
                }
                else{
                    yr++;
                    mnth = -11;
                    getAPIDinamicDate(yr,mnth);
                }

                break;
        }

    });

});