'use strict'
/* eslint-env ,ode, es6*/


//document.cookie = "user_session="+Math.random(); "path=/"; "max-age=3600"; "SameSite=Strict";
const socket = io();
var username="";
function getUsername(){
  username = document.querySelector('#username').value;
  socket.emit('Nameforid', username);
  console.log(username);
};
function getMessage(){
  var usermsg = document.querySelector('#message').value;
  if (username==""){alert("USERNAME NOT DEFFINED")

  } else {
    socket.emit('usermessage', {"usermsg":usermsg,"username":username});
    document.querySelector('#message').value="";
  }
};

socket.on("connect_error", (err) => {
    console.log(err.message);
  });
socket.on ("discord", (msg) => {
    console.log(msg.user,":", msg.message);
    document.getElementById('nop').innerHTML+='<br>'+ msg.user+":"+msg.message;
});
socket.on("cookie", (msg) => { //quand cookie reçu alors l'applique, meme quand page changée il reste
    console.log("reçue");
    document.cookie = "caca="+msg;"path=/"; "max-age=3600"; "SameSite=Strict";
    console.log(document.cookie);
});

