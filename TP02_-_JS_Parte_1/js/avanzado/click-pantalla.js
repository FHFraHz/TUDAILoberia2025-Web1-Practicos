'use strict';
let miDiv = null;
let posX = 0;
let posY = 0;

document.body.addEventListener('click', (event) => dibujarEnPantalla(event));
// document.body.addEventListener('click', (event) => dibujarEnPantalla(event));

function dibujarEnPantalla(event) {
    if(miDiv !== null && (event.clientX === posX) && (event.clientY === posY)) {
        alert('Ya existe un elemento en esta posición.');
    } else {
        posX = event.clientX;
        posY = event.clientY;
        if(miDiv !== null)
            miDiv.remove();
        miDiv = crearMiDiv(posX, posY, '1em');
        document.body.appendChild(miDiv);
    }
}

function crearMiDiv(posX, posY, anchoAlto = '1ch') {
    console.log(posX+","+posY);
    let miDiv = document.createElement('div');
    miDiv.style.position = 'absolute';
    miDiv.style.left = `${posX}px`;
    miDiv.style.top = `${posY}px`;
    miDiv.style.width = anchoAlto;
    miDiv.style.height = anchoAlto;
    miDiv.style.background = `hsl(${Math.floor(Math.random()*255)}, 80%, 50%)`;
    miDiv.style.cursor = 'invert';
    return miDiv;
}