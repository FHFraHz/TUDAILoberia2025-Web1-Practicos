'use strict';

let nombre = 'Hola';
let apellido = 'Mundo';

// También se puedo hacer así:
// let [nombre, apellido] = ['Hola', 'Mundo'];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputNombre').value = nombre;
    document.getElementById('inputApellido').value = apellido;
    saludarHolaMundo(); 
    meterContenidoEnDivs();
    agregarMasParrafosAlDiv('miDiv3');
    agregarEventListeners();
});

function saludarHolaMundo() {
    nombre = document.getElementById('inputNombre').value;
    apellido = document.getElementById('inputApellido').value;
    alert('Nombre: '+nombre+'\nApellido: '+apellido);
}

function registrarIDdeUltimoBoton(event) {
    document.getElementById('idUltimoBoton').innerHTML = event.target.getAttribute('id');
}

function toggleClaseHeadings() {
    let misH1 = document.getElementsByTagName('h1');
    let misH2 = document.getElementsByTagName('h2');
    let misH3 = document.getElementsByTagName('h3');
    let misH4 = document.getElementsByTagName('h4');
    let misH5 = document.getElementsByTagName('h5');
    let misH6 = document.getElementsByTagName('h6');

    Array.from(misH1).forEach((miH1) => { miH1.classList.toggle('claseToggleHeadings')});
    Array.from(misH2).forEach((miH2) => { miH2.classList.toggle('claseToggleHeadings')});
    Array.from(misH3).forEach((miH3) => { miH3.classList.toggle('claseToggleHeadings')});
    Array.from(misH4).forEach((miH4) => { miH4.classList.toggle('claseToggleHeadings')});
    Array.from(misH5).forEach((miH5) => { miH5.classList.toggle('claseToggleHeadings')});
    Array.from(misH6).forEach((miH6) => { miH6.classList.toggle('claseToggleHeadings')});
}

function agregarEventListeners() {
    document.getElementById('miBoton').addEventListener('click', saludarHolaMundo);
    document.getElementById('miBoton').addEventListener('click', (event) => { registrarIDdeUltimoBoton(event) });
    document.getElementById('miBotonColor1').addEventListener('click', (event) => { registrarIDdeUltimoBoton(event) });
    document.getElementById('miBotonColor2').addEventListener('click', (event) => { registrarIDdeUltimoBoton(event) });
    document.getElementById('miBotonColor3').addEventListener('click', (event) => { registrarIDdeUltimoBoton(event) });
    document.getElementById('botonToggleHeadings').addEventListener('click', (event) => {
        registrarIDdeUltimoBoton(event);
        toggleClaseHeadings();
    });
}

function insertarElementoEnDivConInnerHTML(miTipoElemento, miInnerHTML, miDivID) {
    try {
        let miElemento = document.createElement(miTipoElemento);
        miElemento.innerHTML = miInnerHTML;
        document.getElementById(miDivID).appendChild(miElemento);
    } catch(e) { console.log('Error en función con identificador insertarElementoEnDivConInnerHTML(miTipoElemento, miInnerHTML, miDiv):\n'+e); }
}

function meterContenidoEnDivs() {

    function formaChancha() {
        // Forma "chancha" de hacerlo:
        // No suele ser buena práctica meter etiquetas HTML en texto literal, pero a veces
        // se puede hacer, y los motores de plantillas en JS en el fondo suelen hacer esto.
        document.getElementById('miDiv1').innerHTML = `<p>Sasarasa</p>`;
        document.getElementById('miDiv2').innerHTML = `<p>Seserese</p>`;
        document.getElementById('miDiv3').innerHTML = `<p>Sosoroso</p>`;
    }

    function formaCorrectaPeroVerborragica() {
        // Forma "correcta" pero un poquito anticuada de hacerlo:
        // Es lo más correcto en el contexto de JavaScript como lenguaje de programación
        // pero requiere bastantes líneas de código.
        let miEtiquetaP = document.createElement('p');
        miEtiquetaP.innerHTML = 'Rrrarrrr';
        document.getElementById('miDiv1').appendChild(miEtiquetaP);
        
        // Hay que recordar crear siempre un elemento p nuevo
        // de lo contrario, al usar la función appendChild en el div,
        // miEtiquetaP sigue haciendo referencia al primer p que se creó
        miEtiquetaP = document.createElement('p');
        miEtiquetaP.innerHTML = 'Rrrerrrr';
        document.getElementById('miDiv2').appendChild(miEtiquetaP);
    
        miEtiquetaP = document.createElement('p');
        miEtiquetaP.innerHTML = 'Rrrorrrr';
        document.getElementById('miDiv2').appendChild(miEtiquetaP);
    }

    function formaMasElegante() {
        // Forma un poquito más elegante: con una función que se encargue de tofdo
        insertarElementoEnDivConInnerHTML('p', 'asbaldralfa', 'miDiv1');
        insertarElementoEnDivConInnerHTML('p', 'esbeldrelfe', 'miDiv2');
        insertarElementoEnDivConInnerHTML('p', 'usbuldrulfu', 'miDiv3');

    }

    formaMasElegante();

}

function agregarMasParrafosAlDiv(miDivID) {
    alert('es posible insertar más de 1 p en un div? SÍ');
    insertarElementoEnDivConInnerHTML('p', 'sarlandanga', miDivID);
    insertarElementoEnDivConInnerHTML('p', 'sirlindingui', miDivID);
    insertarElementoEnDivConInnerHTML('p', 'sembengrene', miDivID);
}