'use strict';

const MAX_RULETA = 36;
const MILISEGUNDOS_GIRO_RULETA = 500;
let numeroElegido = null;
let colorElegido = null;
let numeroRuleta = 0;
let colorRuleta = "verde";

document.addEventListener('DOMContentLoaded', function() {

    numeroElegido = parseInt(document.getElementById('ruleta-form-numero').value);
    colorElegido = document.getElementById('ruleta-form-color').value;
    numeroRuleta = 0;
    colorRuleta = "verde";

    estilizarSelectNumero();
    estilizarSelectColor();
    verificarModoApuesta();
    document.getElementById('ruleta-form-numero').addEventListener('change', (event) => {
        prevenirEdicionInvalida(event);
        numeroElegido = parseInt(document.getElementById('ruleta-form-numero').value);
        estilizarSelectNumero();
    });
    document.getElementById('ruleta-form-color').addEventListener('change', (event) => {
        prevenirEdicionInvalida(event);
        colorElegido = document.getElementById('ruleta-form-color').value;
        estilizarSelectColor();
    });
    document.getElementById('modo-apuesta-radio-numero').addEventListener('change', verificarModoApuesta);
    document.getElementById('modo-apuesta-radio-color').addEventListener('change', verificarModoApuesta);
    
    document.forms['form-ruleta'].addEventListener('submit', (event) => {
        event.preventDefault();
        girarRuleta();
    })
});

function verificarModoApuesta() {
    if(document.forms['form-ruleta']['modo-apuesta'].value !== 'color') {
        document.getElementById('ruleta-form-numero').removeAttribute('disabled');
        document.getElementById('ruleta-form-color').setAttribute('disabled', true);
    } else {
        document.getElementById('ruleta-form-color').removeAttribute('disabled');
        document.getElementById('ruleta-form-numero').setAttribute('disabled', true);
    }
}

/* Esto es una suerte de control de seguridad para el frontend
para que el usuario no pueda editar campos inválidos
editando el HTML desde la consola. */
function prevenirEdicionInvalida(event) {
    /* No hace lo propuesto. Revisar solución... */
    /*
    if(
        (document.forms['form-ruleta']['modo-apuesta'].value !== 'numero' && event.target.id == 'ruleta-form-numero')
        || (document.forms['form-ruleta']['modo-apuesta'].value !== 'color' && event.target.id == 'ruleta-form-color')
    ) {
        alert('Operación no válida!');
    }
    */
    verificarModoApuesta();
}

function colorNumeroRuleta(numeroRuleta) {
    numeroRuleta = parseInt(numeroRuleta);
    if(numeroRuleta === 0 || (MAX_RULETA === 37 && numeroRuleta === MAX_RULETA))
        return "verde";
    if(
        (numeroRuleta >= 1 && numeroRuleta <= 10) ||
        (numeroRuleta >= 21 && numeroRuleta <= 30)
    ) {
        if(numeroRuleta % 2 !== 0)
            return "rojo";
        return "negro";
    }
    if(
        (numeroRuleta >= 11 && numeroRuleta <= 20) ||
        (numeroRuleta >= 31 && numeroRuleta <= MAX_RULETA)
    ) {
        if(numeroRuleta % 2 !== 0)
            return "negro";
        return "rojo";
    }
}

function colorearElementoRuleta(elemento, numero) {
    switch(colorNumeroRuleta(numero)) {
        case "verde":
            elemento.classList.remove('rojo');
            elemento.classList.remove('negro');
            elemento.classList.add('verde');
            break;
        case "rojo":
            elemento.classList.remove('negro');
            elemento.classList.remove('verde');
            elemento.classList.add('rojo');
            break;
        case "negro":
            elemento.classList.remove('rojo');
            elemento.classList.remove('verde');
            elemento.classList.add('negro');
            break;
        default:
            break;
    }
}

function estilizarSelectNumero() {
    let selectRuletaNumero = document.getElementById('ruleta-form-numero');
    let optionsRuletaNumero = Array.from(document.getElementsByClassName('option-ruleta-numero'));
    optionsRuletaNumero.forEach((optionRuleta) => {
        if(optionRuleta.hasAttribute('selected'))
            colorearElementoRuleta(selectRuletaNumero, selectRuletaNumero.value);
        colorearElementoRuleta(optionRuleta, optionRuleta.value);
    });
}

function estilizarSelectColor() {
    let selectColor = document.getElementById('ruleta-form-color');
    if(selectColor.value !== 'rojo')
        selectColor.style.background = '#333';
    else
        selectColor.style.background = 'firebrick';
}

function girarRuleta() {
    /* se "resetean" las clases de #imagen-ruleta" */
    document.getElementById('imagen-ruleta').classList.remove('girando-ruleta');

    /* se agrega la clase .girando-ruleta a #imagen-ruleta para aplicar la animación CSS */
    document.getElementById('imagen-ruleta').classList.add('girando-ruleta');

    /* ATENCIÓN CON ESTA FUNCIÓN */
    setTimeout(function() {
        document.getElementById('imagen-ruleta').classList.remove('girando-ruleta');
        ejecutarRuleta();
        mostrarVictoria();
    }, MILISEGUNDOS_GIRO_RULETA);
    
    /* Esta función 
    
    setTimeout(function() {
        // mi función aquí
    }, tiempoDeEsperaEnMilisegundos);
    
    hace que JavaScript espere el tiempo designado en el segundo argumento,
    que en este caso es MILISEGUNDOS_GIRO_RULETA,
    especificado en milisegundos como lo sugiere el nombre de la constante.

    Primero JS asigna a '#imagen-ruleta' la clase 'girando-ruleta' y luego espera
    el tiempo indicado en MILISEGUNDOS_GIRO_RULETA para volver a quitarla.
    
    NO se recomienda usar para "emparchar" tiempos de espera con asincronicidad en AJAX.
    En este caso está usado sólo para un fin estético y de experiencia de usuario.
    */
}

function ejecutarRuleta() {

    numeroRuleta = Math.floor(Math.random() * MAX_RULETA);
    document.getElementById('heading-resultado').innerHTML = numeroRuleta;
    colorRuleta = colorNumeroRuleta(numeroRuleta);
    document.getElementById('heading-resultado-color').innerHTML = colorRuleta.toUpperCase();

    colorearElementoRuleta(document.getElementById('heading-resultado'), numeroRuleta);
    colorearElementoRuleta(document.getElementById('heading-resultado-color'), numeroRuleta);
    /*
    console.log("colorElegido: "+colorElegido+"\ncolorRuleta: "+colorRuleta+
        "\nnumeroElegido: "+numeroElegido+"\nnumeroRuleta: "+numeroRuleta);
        */
}

function mostrarVictoria() {
    let gano = false;
    let mensajeGano = '';

    if(document.forms['form-ruleta']['modo-apuesta'].value === 'color') {
        gano = colorElegido === colorRuleta;
        if(gano) {
            mensajeGano = 'Ha ganado con el color '+colorElegido+'!!';
        }
    } else {
        gano = numeroElegido === numeroRuleta;
        if(gano) {
            mensajeGano = 'Ha ganado con el número '+numeroElegido+'!!';
        }
    }

    if(gano) {    
        alert("FELICITACIONES!\n"+mensajeGano);
    }
}