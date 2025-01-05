const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 7050

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
  res.sendFile("C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_avec_API/public/main.html")
})
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static('./Site_avec_API/public'))

io.on('connection', (socket) => {
  socket.on ('chat_message', (msg) => {
      socket.emit("disctraite",msg);
  });
});
//démmarage !
app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
})