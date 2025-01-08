'use strict'
/* eslint-env ,ode, es6*/

const socket = io();
var username="";
function getUsername(){
  username = document.querySelector('#username').value;
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

