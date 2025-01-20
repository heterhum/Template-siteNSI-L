const socket = io();

socket.on("chat",(msg)=>{
    console.log(msg)
})