'use strict'
/* eslint-env ,ode, es6*/ 

//création d'une fonction qui va etre appellé dans le html
//function numbers() {
//    fetch('http://localhost:6300/submit', { //endroit ou enovyé
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json' 
//        },
//        body: JSON.stringify({value: 4 }) // Magie noir JSON aka dictionnaire
//      })
//        .then((response) => response.json()) // On attend une réponse au format JSON
//        .then(data => {
//          console.log('Réponse du serveur:', parseInt(data.receivedData)); //console du naviguateur
//          document.getElementsByClassName('uwu')[0].innerHTML = parseInt(data.receivedData);
//        })
//}

//const { Server } = require("socket.io");
//fetch('http://localhost:6300/submit', { //endroit ou enovyé
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json' 
//    },
//    body: JSON.stringify({value: 4 }) // Magie noir JSON aka dictionnaire
//  })
//    .then((response) => response.json()) // On attend une réponse au format JSON
//    .then(data => {
//      console.log('Réponse du serveur:', data.receivedData); //console du naviguateur
//      document.getElementsByClassName('uwu')[0].innerHTML = parseInt(data.receivedData);
//    })
var c=0;
const socket = io();
socket.on('chat_message', (msg) => {
    c+=1;
    console.log(msg);
    console.log(c);
});