'use strict';
let idTarea = 0;
let tareas = [
    
    // tareas de relleno para pruebas
    crearTarea('asdasa', 'completar asdasa', 'completa'),
    crearTarea('esdesde', 'completar esdesde',),
    crearTarea('isdisdi', 'completar isdisdi',)
    
];

document.addEventListener('DOMContentLoaded', function() {
    refrescarTablaTareas();
});

document.forms['formAgregarTarea'].addEventListener('submit', function(event) {
    event.preventDefault();
    tareas.push(crearTareaDeFormulario(event.target.id));
    refrescarFormularioTareas(event.target.id);
    refrescarTablaTareas();
});

document.getElementById('formParaMostrarNombreEnTitulo').addEventListener('submit', function(event) {
    ponerNombreEnTitulo(event);
});

function refrescarFormularioTareas(idFormularioNuevaTarea) {
    document.forms[idFormularioNuevaTarea]['nombre'].value = '';
    document.forms[idFormularioNuevaTarea]['detalle'].value = '';
    document.forms[idFormularioNuevaTarea]['estado'].value = 'incompleta';
}

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
        nombre: document.forms[idFormularioNuevaTarea]['nombre'].value,
        detalle: document.forms[idFormularioNuevaTarea]['detalle'].value,
        estado: document.forms[idFormularioNuevaTarea]['estado'].value
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
    miBoton.setAttribute('data-id-tarea', tarea.id);
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    // Crear otro botón en el DOM usando la misma variable en memoria JS
    miBoton = document.createElement('button');
    miBoton.classList.add('btn-editar');
    miBoton.title = 'Editar';
    miBoton.innerHTML = '✏';
    miBoton.setAttribute('data-id-tarea', tarea.id);
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    
    // Crear otro botón en el DOM usando la misma variable en memoria JS
    miBoton = document.createElement('button');
    miBoton.classList.add('btn-eliminar');
    miBoton.title = 'Eliminar';
    miBoton.innerHTML = '❌';
    miBoton.setAttribute('data-id-tarea', tarea.id);
    // Agregar botón a la columna de acciones
    miTd.appendChild(miBoton);

    // Agregar columna de botones a la fila
    miTr.appendChild(miTd);
    miTr.setAttribute('data-id-tarea', tarea.id);

    // Agregar un identificador para la fila

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
    agregarEventListenersABotones();
}

function getTarea(idTarea) {
    let i = 0;
    while(i < tareas.length) {
        if(tareas[i].id === parseInt(idTarea)) {
            return tareas[i];
        }
        i++;
    }
    return null;
}

function cambiarCompletaIncompleta(idTarea) {
    let miTarea = getTarea(idTarea);
    if(miTarea.estado !== 'completa') {
        miTarea.estado = 'completa';
    } else {
        miTarea.estado = 'incompleta';
    }
    refrescarTablaTareas();
}

function editarTareaEnTabla(idTarea) {
    let misTRs = Array.from(document.getElementsByTagName('tr'));
    let i = 0;
    let encontrado = false;
    while(i < misTRs.length && !encontrado) {
        if(parseInt(misTRs[i].getAttribute('data-id-tarea')) === parseInt(idTarea)) {
            encontrado = true;
        } else { i++; }
    }

    // esto de usar 'encontrado' es solamente un TOC para mejorar rendimiento
    // y que no haya todo este choclo de acciones
    // mientras quedara un while sin resolver en el fondo
    if(encontrado) {
        misTRs[i].innerHTML = '';
        let miTd = document.createElement('td');
        miTd.innerHTML = idTarea;
        misTRs[i].appendChild(miTd);

        let miTarea = getTarea(idTarea);
        
        // input nombre
        let miInput = document.createElement('input');
        miInput.type = 'text';
        miInput.name = 'nombre';
        miInput.id = 'id-temp-'+idTarea+'-edit-nombre';
        miInput.value = miTarea.nombre;
        miTd = document.createElement('td');
        miTd.appendChild(miInput);
        misTRs[i].appendChild(miTd);
        
        // input detalle
        miInput = document.createElement('input');
        miInput.type = 'text';
        miInput.name = 'detalle';
        miInput.id = 'id-temp-'+idTarea+'-edit-detalle';
        miInput.value = miTarea.detalle;
        miTd = document.createElement('td');
        miTd.appendChild(miInput);
        misTRs[i].appendChild(miTd);
        
        // select estado
        let miSelect = document.createElement('select');
        miSelect.name = 'estado';
        miSelect.id = 'id-temp-'+idTarea+'-edit-estado';

            // Option Incompleta
            let miOption = document.createElement('option');
            miOption.value = 'incompleta';
            miOption.innerHTML = '❕ Incompleta';
            if(miTarea.estado !== 'completa')
                miOption.setAttribute('selected', 'true');
            miSelect.appendChild(miOption);

            // Option completa
            miOption = document.createElement('option');
            miOption.value = 'completa';
            miOption.innerHTML = '✅ Completa';
            if(miTarea.estado !== 'incompleta')
                miOption.setAttribute('selected', 'true');
            miSelect.appendChild(miOption);

        miTd = document.createElement('td');
        miTd.appendChild(miSelect);
        misTRs[i].appendChild(miTd);
            
        // Botones Aceptar Cancelar
        let miBoton = document.createElement('button');
        miBoton.type = 'button';
        miBoton.title = 'Guardar';
        miBoton.innerHTML = '💾';

        miBoton.addEventListener('click', () => {
            miTarea.nombre = document.getElementById('id-temp-'+idTarea+'-edit-nombre').value,
            miTarea.detalle = document.getElementById('id-temp-'+idTarea+'-edit-detalle').value,
            miTarea.estado = document.getElementById('id-temp-'+idTarea+'-edit-estado').value
            alert('Tarea id '+idTarea+' editada con éxito.');
            refrescarTablaTareas();
        });
        
        miTd = document.createElement('td');
        miTd.classList.add('columna-acciones-editar')
        miTd.appendChild(miBoton);

        miBoton = document.createElement('button');
        miBoton.type = 'button';
        miBoton.title = 'Cancelar';
        miBoton.innerHTML = '✖';
        miBoton.addEventListener('click', refrescarTablaTareas);
        miTd.appendChild(miBoton);

        misTRs[i].appendChild(miTd);
    }
}

function eliminarTarea(idTarea) {
    let miTarea = getTarea(idTarea);
    if(confirm('⚠ Eliminar Tarea ⚠'
        +'\n\nID: '+idTarea
        +'\nNombre: '+miTarea.nombre
        +'\nDetalle: '+miTarea.detalle
        +'\nEstado: '+miTarea.estado
        +'\n\n¿Está segur@?')) {
        tareas = tareas.filter(t => parseInt(t.id) !== parseInt(idTarea));
        // tareas.splice(tareas.indexOf(miTarea), 1);
        refrescarTablaTareas();
    }
}

function agregarEventListenersABotones() {
    Array.from(document.getElementsByClassName('btn-completar')).forEach((btn) => {
        btn.addEventListener('click', (event) => {
            cambiarCompletaIncompleta(event.target.getAttribute('data-id-tarea'));
        });
    });

    Array.from(document.getElementsByClassName('btn-incompletar')).forEach((btn) => {
        btn.addEventListener('click', (event) => {
            cambiarCompletaIncompleta(event.target.getAttribute('data-id-tarea'));
        });
    });

    Array.from(document.getElementsByClassName('btn-editar')).forEach((btn) => {
        btn.addEventListener('click', (event) => {
            editarTareaEnTabla(event.target.getAttribute('data-id-tarea'));
        });
    });
    
    Array.from(document.getElementsByClassName('btn-eliminar')).forEach((btn) => {
        btn.addEventListener('click', (event) => {
            eliminarTarea(event.target.getAttribute('data-id-tarea'));
        });
    });
}

document.getElementById('btn-cambiarEstiloDiv').addEventListener('click', function() {
    // Método 1: usando hsl
    document.getElementById('divACambiarEstilo').style.background = 'hsl('+Math.floor(Math.random()*255)+', 80%, 37.5%)';
    // Método 2: usando un color estático
    // document.getElementById('divACambiarEstilo').style.background = 'cyan';
    document.getElementById('divACambiarEstilo').style.border = '3px solid red';
});