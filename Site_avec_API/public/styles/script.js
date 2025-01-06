'use strict'
/* eslint-env ,ode, es6*/

const socket = io();

socket.on ("discord", (msg) => {
    console.log(msg);
});