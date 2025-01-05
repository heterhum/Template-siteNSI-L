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
window.onload = function() {
    var c=0;
    var newm="";
    var plist=[];
    const socket = io();
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 6;
    canvas.height = 6;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    function decimalToRgb(decimal) {
        return {
          red: (decimal >> 16) & 0xff,
          green: (decimal >> 8) & 0xff,
          blue: decimal & 0xff,
        };
      };

    
    socket.on ('chat_message', (msg) => {
        c+=1;
        newm=msg.split("\r\n");
        for (let i=0;i<newm.length;i++){
            let u = JSON.parse(newm[i]);
            u= [].concat(...u);
            plist.push([u]);
        }
        newm="";
    
        
        if (plist[0]!=undefined){
            for (let i=0;data.length;i++){
                let h=decimalToRgb(plist[0][i]);
                data[i]=h.red;
                data[i+1]=h.green;
                data[i+2]=h.blue;
            };
            ctx.putImageData(imageData, 0, 0);
            console.log("done");
        };
    });
};