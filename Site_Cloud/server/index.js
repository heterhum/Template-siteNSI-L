import { createRequire } from "module";
const require = createRequire(import.meta.url);
//const express = require('express');
//const cookieParser = require('cookie-parser');
//const app = express();
//const http = require('http');
//const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server);
//const PORT = 3000;
//const path = require('path');
//app.use(cookieParser());
//require('dotenv').config();
const mongodb = require('mongodb');
const uri = process.env.URI;
async function main(){
  const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
      const test =await client.db("myDB").collection("DB").find().toArray();
      console.log(test)
  } catch (e) {
      console.error(e);
      await client.close();}
};
main().catch(console.error);

// Genere page html de l'acceuil + css + js +img ect ...
//app.get('/', async(req, res) => {
//  res.sendFile(path.resolve(__dirname, '../public/main.html'));
//  
//});
//app.use((req, res, next) => {
//  res.set('X-Content-Type-Options', 'nosniff');
//  next();
//});
//app.use(express.static('./Site_cloud/public'));

//démmarage !
//server.listen(PORT, () => {
//  console.log(`Serveur démarré : http://localhost:${PORT}`)
//});
