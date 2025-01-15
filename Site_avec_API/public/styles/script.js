'use strict'
/* eslint-env ,ode, es6*/

const socket = io();
var username="";

// function use by main.html

function getUsername(){ // to do : add error
  username = document.querySelector('#username').value;
  socket.emit('Nameforid', username);
};

socket.on("cookie", (msg) => { //quand cookie reçu alors l'applique, meme quand page changée il reste
  console.log("reçue");
  document.cookie = "acces_cookie="+msg;"path=/"; "max-age=3600"; "SameSite=Strict";
});

// function use by chat.html

function getMessage(){
  var usermsg = document.querySelector('#message').value;
  var cookie = document.cookie.substring(13); //retire the "acces_cookie=" part
  socket.emit('usermessage', {"usermsg":usermsg,"id":cookie});
  document.querySelector('#message').value="";
  };

function changeUsername(){ // to do : add retrisction on username change
  username = document.querySelector('#username').value;
  socket.emit('ChangeName', {"username":username,"cookie":document.cookie});
}

socket.on ("discord", (msg) => { //to do : prépare balise correct
  document.getElementById('messages').innerHTML+='<br>'+ msg.user+":"+msg.message;
});

//both main.html and chat.html

socket.on("connect_error", (err) => {
    console.log(err.message);
  });


//DO NOT use this method if you want to creat a secure website. A user can use all function with console