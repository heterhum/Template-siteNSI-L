'use strict'
/* eslint-env ,ode, es6*/

const socket = io();

socket.on("connect_error", (err) => {
    console.log(err.message);
  });
socket.on ("discord", (msg) => {
    console.log(msg);
});
//
//function uwu(){
//    socket.emit("want", true);
//}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
while (true){
    //sleep(2000).then(() => { socket.emit("want", true); });
    setTimeout(() => {  console.log('World!'); }, 2000);
};
