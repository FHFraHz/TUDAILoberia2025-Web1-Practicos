'use strict';

document.getElementById('botonToggleDivConInformacion').addEventListener('click', function() {
    document.getElementById('divConInformacion').classList.toggle('invisible');
});

document.getElementById('calculadora-calcular').addEventListener('click', operarCalculadora);

function operarCalculadora() {
    let operando1 = 0;
    if(document.getElementById('checkbox-calculadora-acumular').checked) {
        operando1 = parseFloat(document.getElementById('calculadora-resultado').innerHTML);
    } else {
        operando1 = parseFloat(document.getElementById('calculadora-operando1').value);
    }
    let operando2 = parseFloat(document.getElementById('calculadora-operando2').value);
    let resultado = 0;
    switch (document.getElementById('calculadora-operador').value) {
        case "+":
            resultado = operando1 + operando2;
            break;
        case "-":
            resultado = operando1 - operando2;
            break;
        case "*":
            resultado = operando1 * operando2;
            break;
        case "/":
            resultado = operando1 / operando2;
            break;
        default:
            break;
    }
    document.getElementById('calculadora-resultado').innerHTML = resultado;
}