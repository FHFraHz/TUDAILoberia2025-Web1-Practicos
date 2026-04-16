'use strict';

function convertirATitleCase(str) {
    if(str.length > 1)
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    if(str.length > 0)
        return str.toUpperCase();
    return null;
}