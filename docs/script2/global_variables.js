const monthName = document.querySelector('.titulo-del-cuadro h1');
const dias = document.querySelectorAll('div.cuadros-mes div.dia');

var today = new Date();
today = [today.getFullYear(),today.getMonth(),today.getDate()]; // array con la fecha actual

var date = new Date();

var month = date.getMonth(); // mes actual
var year = date.getFullYear(); // año actual


/* Variables para cambiar meses y asi xd */
var yr = 0;
var mnth = 0;

/* Variables para determinar los limites de los dias al añadir un nuevo curso o editarlo */

var limites = {};
var dayAlreadyWrote = false;

/* Variable para hacer que pinche funcione lo del new curso y asi */

var its_pressed = false;