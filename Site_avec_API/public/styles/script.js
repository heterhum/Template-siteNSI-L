'use strict'
/* eslint-env ,ode, es6*/


//document.cookie = "user_session="+Math.random(); "path=/"; "max-age=3600"; "SameSite=Strict";
const socket = io();
var username="";
function RedirectionJavascript(){
  document.location.href="http://localhost:5500/chat";
};
function getUsername(){ // to do : add error
  username = document.querySelector('#username').value;
  socket.emit('Nameforid', username);
  //setTimeout(RedirectionJavascript(), 2000);
};
function getMessage(){
  var usermsg = document.querySelector('#message').value;
  var cookie = document.cookie.substring(13); //retire the "acces_cookie=" part
  socket.emit('usermessage', {"usermsg":usermsg,"id":cookie});
  document.querySelector('#message').value="";
  };

// to do : add retrisction on username change
function changeUsername(){
  username = document.querySelector('#username').value;
  socket.emit('ChangeName', {"username":username,"cookie":document.cookie});
}


socket.on("connect_error", (err) => {
    console.log(err.message);
  });
socket.on ("discord", (msg) => { //to do : prépare balise correct
    document.getElementById('messages').innerHTML+='<br>'+ msg.user+":"+msg.message;
});
socket.on("cookie", (msg) => { //quand cookie reçu alors l'applique, meme quand page changée il reste
    console.log("reçue");
    document.cookie = "acces_cookie="+msg;"path=/"; "max-age=3600"; "SameSite=Strict";
});

