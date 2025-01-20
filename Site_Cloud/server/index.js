import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
const path = require('path');
const __dirname = path.resolve();
app.use(cookieParser());
require('dotenv').config();

const mongodb = require('mongodb');
const uri = process.env.URI;
const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
async function main(client){
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
      const test =await client.db("myDB").collection("DB").find().toArray();
      await client.close();
      return test
  } catch (e) {
      console.error(e);
      await client.close();}
};

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/users/:username', (req,res)=>  { 
  var user = req.params.username
  var data=main(client).catch(console.error);
  console.log(path.join(__dirname, '../Template-siteNSI/Site_Cloud/public/main.html'))
  res.sendFile(path.join(__dirname, '../Template-siteNSI/Site_Cloud/public/main.html')); // TO DO : here
  //res.sendFile("./Site_Cloud/public/main.html") // TO DO : here
  io.emit("chat",{"user":user,"data":data})
});
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static('./Template-siteNSI/Site_cloud/public'));

//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});
