'use strict'
/* eslint-env ,ode, es6*/

const socket = io();

socket.on("connect_error", (err) => {
    console.log(err.message);
  });
socket.on ("discord", (msg) => {
    console.log(msg);
});

function uwu(){
    socket.emit("want", true);
}