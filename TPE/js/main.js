'use strict';

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('boton-hamburguesa').addEventListener('click', function() {
        document.getElementById('navbar-ul-menu').classList.toggle('mobile-abierto');
        document.getElementById('fondo-nav-overlay').classList.toggle('mostrar');
    });

});