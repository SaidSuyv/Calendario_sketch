const father = document.querySelector('.cuadros-mes');

var weekCounter = 1;

for(let i = 0; i < 6; i++){

  var days_element = `
  <div class="semana-${weekCounter} d-flex my-2">
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
    <div class="dia" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
      <p class="texto-dia">{n}</p>
    </div>
  </div>
  `;
  father.innerHTML += days_element;
  weekCounter++;

}
