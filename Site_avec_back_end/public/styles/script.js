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
var newm="";
const socket = io();
socket.on('chat_message', (msg) => {
    c+=1;
    newm=msg.split("\r\n");
    console.log(newm[0]);
    newm=JSON.parse(newm[0]);
    console.log('message: ', c,"arrivé");
    console.log(newm); 
    newm="";
});

function domloaded(){
    window.c = document.getElementById("myCanvas");
    window.ctx = c.getContext("2d");
    window.largeur=50;
    window.longueur=50;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    console.log(c.width,c.height)
    window.taille=parseInt(c.width/largeur);
}
function doit(){
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
}
function doit1(){
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 200);
    ctx.stroke();
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

function draw(e){

    let a=[]
    for (let i = 0; i < largeur; i++) {
        let b=[]
        for (let j = 0; j < longueur; j++) {
            b[j]=0
        }
        a[i]=b
    }
    for (let i=0;i<a.length; i++){
        for (let j=0;j<a.length; j++){
            if (a[i][j]==0){ 
                ctx.fillStyle="pink";
                ctx.fillRect(j*taille,i*taille,taille,taille)
            }  else{
                ctx.fillStyle="black";
                ctx.fillRect(j*taille,i*taille,taille,taille)
            }
            ctx.strokeRect(j*taille, i*taille, taille, taille)
        }
    }
    //var pos=getMousePos(c,e);
    //console.log(pos.x,pos.y)
    //ctx.arc(pos.x, pos.y, 2, 0, 2 * Math.PI);
    //ctx.stroke();
}