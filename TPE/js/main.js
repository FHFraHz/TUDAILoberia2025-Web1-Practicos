'use strict';

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('boton-hamburguesa').addEventListener('click', function() {
        document.getElementById('navbar-ul-menu').classList.toggle('abierto');
        document.getElementById('overlay-oscuro').classList.toggle('mostrar');
    });

});