'use strict';

/*
Arreglo de captchas:
una "colección" interna de captchas que tiene JSON's
dentro de los cuales se guarda el código real que tiene que ingresar el usuario
    (un string, en este caso son números porque los dibujos son números pero puede ser cualquier cosa)
y la imagen asociada a cada captcha.
*/
let captchas = [
    {
        codigo: "72581",
        imagen: "captcha1.png"
    },
    {
        codigo: "68473",
        imagen: "captcha2.png"
    },
    {
        codigo: "23591",
        imagen: "captcha3.png"
    },
    {
        codigo: "48639",
        imagen: "captcha4.png"
    },
    {
        codigo: "78265",
        imagen: "captcha5.png"
    }
];

/* El "captchaActivo" va a ser el que esté cargado en memoria
"esperando" para después ser comparado con lo que ingrese el usuario */
let captchaActivo = null;

function cargarCaptchaAleatorio() {

/*
Math.floor(valor) es la función piso: se queda con la parte entera redondeando para abajo

Math.random() genera un número aleatorio decimal entre 0 y 1,
que luego se multiplicará por un máximo posible estipulado;
en este caso el máximo posible debe ser EL TAMAÑO DEL ARREGLO DE CAPTCHAS MENOS 1.
 */
    captchaActivo = captchas[
        Math.floor(
            Math.random() * (captchas.length - 1)
        )
    ];
    document.getElementById('imagen-captcha').setAttribute('src', 'img/captchas/'+captchaActivo.imagen);
}

/* Se pide que ni bien se cargue el DOM, se cargue un captcha aleatorio para mostrar
y pedirle al usuario que lo ingrese */
document.addEventListener('DOMContentLoaded', cargarCaptchaAleatorio);

/* Se le pide al botón de ID 'boton-captcha' que, al hacerle clic, llame a la función
para validar el captcha con el valor que ingresó el usuario */
document.getElementById('boton-captcha').addEventListener('click', validarCaptcha);

function validarCaptcha() {
    /* Al ser un input se debe traer su atributo value para pedir lo que ingresó el usuario */
    let entrada = document.getElementById('input-captcha').value;

    /* Si es incorrecto, carga otro nuevo */
    if(entrada !== captchaActivo.codigo) {
        alert('Captcha incorrecto');
        cargarCaptchaAleatorio();
    }
    /* Si es correcto, borra el contenido del captcha de la página y muestra el contenido oculto */
    else {
        alert('Captcha correcto');
        document.getElementById('captcha-contacto').remove();
        document.getElementById('contenedor-contacto').style.display = 'block';
    }
}