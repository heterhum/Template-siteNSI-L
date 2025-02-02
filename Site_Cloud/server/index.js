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

const numbergen=17;
const stringselec = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function cookiegenerator(max) {
  var l = ""
  for (var i = 0; i < max; i++) {
    l += stringselec[Math.floor(Math.random() * max)];
  }
  return l;
}

// Database
const mongodb = require('mongodb'); 
//const uri = process.env.URI;
const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
async function see_user_data(client,name){ 
  try {
      await client.connect();
      var userdata =await client.db("myDB").collection("users").findOne({"username":name});
      await client.close();
      if (userdata){
        return userdata
      } else {
        return null
      }
  } catch (e) {
      console.error(e);
      await client.close();}
};
async function modifie_user_data(client,name,modifplace,modif){ 
  const modification={[modifplace]:modif}
  try {
      await client.connect();
      try {
        await client.db("myDB").collection("users").updateOne({"username":name},{$set:modification});
        await client.close();
        return true
      } catch (e) {
        console.error(e);
        await client.close();
        return false
      }
  } catch (e) {
      console.error(e);
      await client.close();}
};
async function create_new_user(client,name,password){ //TO DO : allow new user creation
  const modification={[modifplace]:modif}
  try {
      await client.connect();
      try {
        await client.db("myDB").collection("users").updateOne({"username":name},{$set:modification});
        await client.close();
        return true
      } catch (e) {
        console.error(e);
        await client.close();
        return false
      }
  } catch (e) {
      console.error(e);
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
  console.log("someone is on the main page")
});
app.use('/static',express.static(__dirname+'/Site_cloud/public'));

//--------------------------------------------------------------

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.post("/login", async function (req, res) { // TO DO : systeme de cookie pour la connexion
  const password = req.body.connectpassword;
  const username = req.body.connectusername;

  var data = await see_user_data(client,username).catch(console.error)

  if (data.password==password && data!=null){
    res.redirect('/user/'+username)
    console.log(username, " connected successfully")
  } else {
    res.status(204).send()
    console.log("someone try to connect but fail")
  }
});
app.post("/create", async function (req, res) { // TO DO : systeme de cookie pour la connexion
  const password = req.body.createmdp;
  const username = req.body.createname;

  var data = await see_user_data(client,username).catch(console.error)

  if (data.password==password && data!=null){
    res.redirect('/user/'+username)
    console.log(username, " connected successfully")
  } else {
    res.status(204).send()
    console.log("someone try to connect but fail")
  }
});
//--------------------------------------------------------------

app.get('/user/:uid', async function(req, res,next) { // TO DO : systeme de cookie pour la connexion
  var uid = req.params.uid;
  var data= await see_user_data(client,uid).catch(console.error);
  if (data!=null){
    console.log(uid," is now on his own cloud")
    req.uide=uid;  
    res.render('HPuser',{"pp":data["pp"],"name":uid,"txt":data["file"]["01"]}); //Bien organiser
    next();
  } else{
    res.redirect('/');
    console.log("connection with ",uid," failed")
  };
});
app.use('/static',express.static(__dirname+'/Site_cloud/server/views'),(req,res,next)=>{next()});
app.use('/user/:uid/fluid', (req, res, next) => { // TO DO : Verif securité aprés systeme de cookie
  var uid=req.params.uid;
  express.static(__dirname+'/Site_cloud/public/Personnal_file/'+uid)(req,res,next); 
});

//--------------------------------------------------------------

app.post('/upload/:uid', (req, res) => { // Ajouté sécurité, si l'utilisateur modifie le action post avec f12 alors il peut upload ou il veut
  permulter(req.params.uid).single('file')(req, res, function (err) {
    try {
      console.log(req.params.uid, " successfully uploaded a file")
      res.status(204).send()
    } catch (err) {
      console.log(req.params.uid, " fail to uploaded a file")
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
