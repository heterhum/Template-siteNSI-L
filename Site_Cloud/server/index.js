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


// Database
const mongodb = require('mongodb'); 
//const uri = process.env.URI;
const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
async function main(client,name){ //TO DO : find a way to modify the database
  try {
      await client.connect();
      const tofind= 'users.'+ name +'.exist';
      var userdata =await client.db("myDB").collection("DB").find({[tofind]:true}).toArray();
      //console.log(userdata)
      let d = userdata[0]["users"][name]
      await client.close();
      return d;
  } catch (e) {
      console.error(e);
      console.log("l'utilisateur n'existe pas")
      await client.close();}
};


// Upload file
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
app.get('/', async function(req, res) { // main page
  var filepath=path.join(__dirname,"Site_Cloud","public","main.html")
  res.sendFile(filepath);
});
app.use('/static',express.static(__dirname+'/Site_cloud/public'));

//--------------------------------------------------------------

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.post("/login", async function (req, res) { // TO DO : systeme de cookie pour la connexion
  console.log("1")
  const password = req.body.connectpassword;
  const username = req.body.connectusername;

  var data = await main(client,username).catch(console.error)
  console.log("2")
  console.log(data.password,password)
  if (data.password==password){
    res.redirect('/user/'+username)
    console.log("3")
  } else {
    res.status(204).send()
    console.log("4")
  }
});

//--------------------------------------------------------------

app.get('/user/:uid', async function(req, res,next) { // TO DO : systeme de cookie pour la connexion
  var uid = req.params.uid;
  var data= await main(client,uid).catch(console.error);
  console.log(uid,data)
  console.log()
  if (data!=undefined){
    console.log("good")
    req.uide=uid;  
    res.render('HPuser',{"pp":data["pp"],"name":uid,"txt":data["file"]["01"]}); //Bien organiser
    console.log(req.uide);
    next();
  } else{
    res.redirect('/');
  };
});
app.use('/static',express.static(__dirname+'/Site_cloud/server/views'),(req,res,next)=>{next()});
app.use('/user/:uid/fluid', (req, res, next) => { // TO DO : Verif securité aprés systeme de cookie
  var uid=req.params.uid;
  console.log(req.params.uid," good")
  express.static(__dirname+'/Site_cloud/public/Personnal_file/'+uid)(req,res,next); 
});

//--------------------------------------------------------------

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
