'use strict';

document.getElementById('formParaMostrarNombreEnTitulo').addEventListener('submit', function(event) {
    ponerNombreEnTitulo(event);
});

function ponerNombreEnTitulo(event) {
    event.preventDefault();
    let nombre = document.forms['formParaMostrarNombreEnTitulo']['nombre'].value;
    let apellido = document.forms['formParaMostrarNombreEnTitulo']['apellido'].value;
    if(nombre !== '' || apellido !== '') {
        document.getElementById('mostrarNombreEnTitulo').innerHTML = nombre+' '+apellido;
    } else {
        document.getElementById('mostrarNombreEnTitulo').innerHTML = 'Mundo';
    }
}