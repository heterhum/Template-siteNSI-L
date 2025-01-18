import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
const path = require('path');
app.use(cookieParser());
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
//const client = new MongoClient('mongodb://127.0.0.1:27017/?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000')
//await client.connect();
//const db = client.db('myDB');
//console.log(db.collection("myDB"))

//MongoClient.connect ('mongodb://127.0.0.1:27017') 
//.then(()=>{console.log('Connecté à la base de données')})
//.catch((err)=>{console.log(err)})
//const db = client.db('Site_cloud');
//console.log(db)


async function main(){
  const uri = process.env.URI;
  const client = new MongoClient(uri);
  try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
      await  listDatabases(client);
  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}
main().catch(console.error);

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/main.html'));
  
});
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static('./Site_cloud/public'));

//démmarage !
//server.listen(PORT, () => {
//  console.log(`Serveur démarré : http://localhost:${PORT}`)
//});
