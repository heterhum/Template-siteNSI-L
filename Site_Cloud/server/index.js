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
//const uri = process.env.URI;
const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
async function main(client,name){
  try {
      await client.connect();
      const tofind= 'users.'+ name +'.exist';
      const userdata =await client.db("myDB").collection("DB").find({[tofind]:true}).toArray();
      await client.close();
      return userdata;
  } catch (e) {
      console.error(e);
      await client.close();}
};

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async function(req, res) {
  var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  res.sendFile (filepath);
});
app.use('/static',express.static(__dirname+'/Site_cloud/public'));



app.get('/user/:uid', async function(req, res) {
  var uid = req.params.uid;
  var data= await main(client,uid).catch(console.error);
  console.log(data);
  if (data!=undefined && data.length>0){
    res.render('HPuser',{"pp":data[0]["users"][uid]["pp"],"name":uid,"txt":"flag.txt"}); 
    res.locals.uid=uid;
  } else{ 
    res.redirect('/');
  };
});
app.use('/static', (req, res, next) => {
  express.static(__dirname+'/Site_cloud/server/views') // TO DO :here
  next();
});
app.use('/fluid', (req, res, next) => {
  uid=res.locals.uid;
  express.static(__dirname+'/Site_cloud/public/Personnal_files/'+uid) // TO DO :here
  
  next();
});

//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});


//later
  //var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  //res.sendFile (filepath);
  //app.use('/static',express.static(__dirname+'/Site_cloud/public'));
