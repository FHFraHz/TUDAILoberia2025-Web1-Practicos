'use strict';

document.getElementById('imagen-a-agrandar').addEventListener('mouseover', function() {
    document.getElementById('imagen-a-agrandar').classList.remove('imagen-normal');
    document.getElementById('imagen-a-agrandar').classList.add('imagen-grande');
});

document.getElementById('imagen-a-agrandar').addEventListener('mouseleave', function() {
    document.getElementById('imagen-a-agrandar').classList.remove('imagen-grande');
    document.getElementById('imagen-a-agrandar').classList.add('imagen-normal');
});