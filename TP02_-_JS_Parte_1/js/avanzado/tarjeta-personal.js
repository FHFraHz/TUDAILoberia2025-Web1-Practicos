'use strict';

let persona = {
    nombre: '',
    apellido: '',
    profesion: '',
    email: '',
    telefono: '',
    direccion: ''
};

document.addEventListener('DOMContentLoaded', mostrarTarjeta);

function mostrarTarjeta() {
    if(persona.nombre === '' || persona.apellido === '') {
        document.getElementById('tarjeta-grid').style.display = 'none';
    } else {
        document.getElementById('mensaje-introduzca-datos').style.display = 'none';
        Object.keys(persona).forEach((key) => {
            document.getElementById('tarjeta-'+key).innerHTML = persona[key];
            if(persona[key] === 'N/A')
                document.getElementById('tarjeta-'+key).classList.add('color-dato-no-aplicable');
            else
                document.getElementById('tarjeta-'+key).classList.remove('color-dato-no-aplicable');
        });
        document.getElementById('tarjeta-grid').style.display = 'grid';
    }
}

document.forms['form-tarjeta-personal'].addEventListener('submit', (event) => {
    event.preventDefault();
    cargarPersonaDeForm();
    mostrarTarjeta();
});

function cargarPersonaDeForm() {
    persona.nombre = document.forms['form-tarjeta-personal']['nombre'].value;
    persona.apellido = document.forms['form-tarjeta-personal']['apellido'].value;
    persona.profesion = document.forms['form-tarjeta-personal']['profesion'].value;
    persona.email = document.forms['form-tarjeta-personal']['email'].value;
    persona.telefono = document.forms['form-tarjeta-personal']['telefono'].value;
    persona.direccion = document.forms['form-tarjeta-personal']['direccion'].value;

    Object.keys(persona).forEach((key) => {
        if(persona[key] === '')
            persona[key] = 'N/A';
    });
}