'use strict';

// The sumerian object can be used to access Sumerian engine
// types.
//
/* global sumerian */

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

// https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function checkCookie(args, ctx) {

    var cookieValue = getCookie(args.cookieName);

    if (cookieValue != "") {
        ctx.worldData.cookie = cookieValue;
    } else {
        cookieValue = uuidv4();
        ctx.worldData.cookie = cookieValue;
        setCookie(args.cookieName, cookieValue, args.cookieExpires);
    }
}


// Called when play mode starts.
//
function setup(args, ctx) {
	
    if (window.navigator.cookieEnabled) {
        checkCookie(args, ctx);
    } else {
        ctx.worldData.cookie = 'disabled';
    }
	
}

// Called when play mode stops.
//
function cleanup(args, ctx) {}

// Defines script parameters.
//
var parameters = [{
        name: 'Cookie Name',
        type: 'string',
        key: 'cookieName',
        'default': 'tankAndDozer',
        description: 'The cookie name'
    },
    {
        name: 'Expires (days)',
        type: 'int',
        key: 'cookieExpires',
        'default': 30,
        description: 'Days until cookie expires'
    },
];