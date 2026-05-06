'use strict';

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
let captchaActivo = null;

function cargarCaptchaAleatorio() {
    captchaActivo = captchas[
        Math.floor(
            Math.random() * (captchas.length - 1)
        )
    ];
    document.getElementById('imagen-captcha').setAttribute('src', 'img/captchas/'+captchaActivo.imagen);
}

document.addEventListener('DOMContentLoaded', cargarCaptchaAleatorio);

document.getElementById('boton-captcha').addEventListener('click', function() {
    let entrada = document.getElementById('input-captcha').value;
    if(entrada !== captchaActivo.codigo) {
        alert('Captcha incorrecto');
        cargarCaptchaAleatorio();
    }
    else {
        alert('Captcha correcto');
        document.getElementById('captcha-contacto').remove();
        document.getElementById('contenedor-contacto').style.display = 'block';
    }
});