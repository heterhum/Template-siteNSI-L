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
app.set("views", path.join(__dirname, "/Site_cloud/server/views"));
app.set("view engine", "ejs");
require('dotenv').config();


const mongodb = require('mongodb');
const uri = process.env.URI;
const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
async function main(client,name){
  try {
      await client.connect();

      const test =await client.db("myDB").collection("DB").find({"user": name}).toArray();
      await client.close();
      return test
  } catch (e) {
      console.error(e);
      await client.close();}
};
//var d=await main(client,"heterhum").catch(console.error);
//console.log(d[0].heter);

// Genere page html de l'acceuil + css + js +img ect ...
//app.get('/users/:username', (req,res)=>  { 
//  var user = req.params.username
//  var data=main(client).catch(console.error);
//});  


app.get('/user/:uid', async function(req, res) {
  var uid = req.params.uid;
  var d= await main(client,uid).catch(console.error);
  console.log(d);
  res.render('HPuser',{"titre":d[0].heter});
});
//app.use(express.static(__dirname+'/Template-siteNSI/Site_cloud/public')); // TO DO : here
app.use('/static',express.static(__dirname+'/Site_cloud/public'));

//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});


//later
  //var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  //res.sendFile (filepath);
