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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dossier où les fichiers seront enregistrés
    cb(null, "C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_Cloud/public/Personnal_file/heterhum/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async function(req, res) {
  var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  res.sendFile(filepath);
});
app.use('/static',express.static(__dirname+'/Site_cloud/public'));



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

app.post("/upload",(req, res) =>{
  console.log(req);
  upload.single("file")
});

//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});


//later
  //var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  //res.sendFile (filepath);
  //app.use('/static',express.static(__dirname+'/Site_cloud/public'));
