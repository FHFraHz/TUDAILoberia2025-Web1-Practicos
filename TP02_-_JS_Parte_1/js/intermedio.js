'use strict';
let idTarea = 0;
let tareas = [
    crearTarea('asdasa', 'completar asdasa', 'completa'),
    crearTarea('esdesde', 'completar esdesde',),
    crearTarea('isdisdi', 'completar isdisdi',)
];

document.addEventListener('DOMContentLoaded', function() {
    refrescarTablaTareas();
});

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

function crearTareaDeFormulario(idFormularioNuevaTarea) {
    return {
        id: ++idTarea,
        nombre: document.forms[idFormularioNuevaTarea]['nombre'],
        detalle: document.forms[idFormularioNuevaTarea]['detalle'],
        estado: document.forms[idFormularioNuevaTarea]['estado']
    };
}
function crearTarea(nombre, detalle = 'n/a', estado = 'incompleta') {
    return {
        id: ++idTarea,
        nombre: nombre,
        detalle: detalle,
        estado: estado
    };
}

function insertarTareaEnTabla(tarea, tablaID) {
    // crear fila
    let miTr = document.createElement('tr');

    // crear el primer td
    let miTd = document.createElement('td');
    // inserta el contenido de tarea.id dentro del elemento td
    miTd.innerHTML = tarea.id;
    // lo inserta en la fila
    miTr.appendChild(miTd);

    // se reutiliza la variable para crear otro td en el árbol de contenido del DOM
    miTd = document.createElement('td');
    // inserta el contenido de tarea.nombre dentro del elemento td
    miTd.innerHTML = tarea.nombre;
    // lo inserta en la fila
    miTr.appendChild(miTd);
    
    // se reutiliza la variable para crear otro td en el árbol de contenido del DOM
    miTd = document.createElement('td');
    // inserta el contenido de tarea.detalle dentro del elemento td
    miTd.innerHTML = tarea.detalle;
    // lo inserta en la fila
    miTr.appendChild(miTd);

        
    // se reutiliza la variable para crear otro td en el árbol de contenido del DOM
    miTd = document.createElement('td');
    // inserta el contenido de tarea.estado dentro del elemento td
    if(tarea.estado !== 'completa') {
        miTd.innerHTML = '❕ ';
    } else {
        miTd.innerHTML = '✅ ';
    }
    miTd.innerHTML += convertirATitleCase(tarea.estado);
    miTd.classList.add('columna-tarea-'+tarea.estado);

    // lo inserta en la fila
    miTr.appendChild(miTd);

    // Última columna: botones de acción
    miTd = document.createElement('td');
    miTd.classList.add('columna-acciones');

    // Primer botón: marcar completa/incompleta
    let miBoton = document.createElement('button');
    if(tarea.estado !== 'completa') {
        miBoton.classList.add('btn-completar');
        miBoton.title = 'Marcar Completa';
        miBoton.innerHTML = '✅';
    } else {
        miBoton.classList.add('btn-incompletar');
        miBoton.title = 'Marcar Incompleta';
        miBoton.innerHTML = '❕';
    }
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    // Crear otro botón en el DOM usando la misma variable en memoria JS
    miBoton = document.createElement('button');
    miBoton.classList.add('btn-editar');
    miBoton.title = 'Editar';
    miBoton.innerHTML = '✏';
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    
    // Crear otro botón en el DOM usando la misma variable en memoria JS
    miBoton = document.createElement('button');
    miBoton.classList.add('btn-eliminar');
    miBoton.title = 'Eliminar';
    miBoton.innerHTML = '❌';
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    // Agregar columna de botones a la fila
    miTr.appendChild(miTd);

    // Agregar un identificador para la fila
    miTr.setAttribute('data-id-tarea', tarea.id);

    // FINALMENTE se agrega la tr al body de la tabla
    document.getElementById(tablaID).tBodies[0].appendChild(miTr);
}

function refrescarTablaTareas() {
    document.getElementById('tabla-lista-tareas').tBodies[0].innerHTML = '';
    if(tareas.length > 0) {
        tareas.forEach((tarea) => {
            insertarTareaEnTabla(tarea, 'tabla-lista-tareas');
        });
    }
}