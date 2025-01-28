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
import multer from 'multer';
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

function permulter(userID){
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname,"Site_Cloud","public","Personnal_file",userID)); // TO DO : pouvoir changé le nom du dossier en fonction de l'utilisateur
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  var upload = multer({ storage: storage });
  return upload
};

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async function(req, res) {
  var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  res.sendFile(filepath);
});
app.use('/static',express.static(__dirname+'/Site_cloud/public'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.post("/login", (req, res) =>{ // TO DO : fix
  console.log("test")
  console.log(req.body)
  res.status(204).send()
});


app.get('/user/:uid', async function(req, res,next) {
  var uid = req.params.uid;
  var data= await main(client,uid).catch(console.error);
  if (data!=undefined && data.length>0){
    req.uide=uid;  
    res.render('HPuser',{"pp":data[0]["users"][uid]["pp"],"name":uid,"txt":data[0]["users"][uid]["file"]["01"]}); //Bien organiser
    console.log(req.uide);
    next();
  } else{
    res.redirect('/');
  };
});
app.use('/static',express.static(__dirname+'/Site_cloud/server/views'),(req,res,next)=>{next()});
app.use('/user/:uid/fluid', (req, res, next) => {
  var uid=req.params.uid;
  console.log(req.params.uid," good")
  express.static(__dirname+'/Site_cloud/public/Personnal_file/'+uid)(req,res,next); 
});


app.post('/upload/:uid', (req, res) => { // Ajouté sécurité, si l'utilisateur modifie le action post avec f12 alors il peut upload ou il veut
  permulter(req.params.uid).single('file')(req, res, function (err) {
    try {
      console.log("it's working", req.params.uid)
      res.status(204).send()
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});



//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});


//later
  //var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  //res.sendFile (filepath);
  //app.use('/static',express.static(__dirname+'/Site_cloud/public'));
