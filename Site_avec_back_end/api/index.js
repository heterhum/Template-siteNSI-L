'use strict'
/* eslint-env ,ode, es6*/ 

const express = require('express')
const app = express()
const { spawn } = require('node:child_process');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 6300

// Importer la logique de la page d'accueil
const genererPageAccueil = require('./pages/index-get.js')

function runPythonScript(scriptPath, args, callback) {
    const pythonProcess = spawn('python', [scriptPath].concat(args)); //comme dans un terminale
    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString(); // Collect data from Python script
        //callback(null, chunk.toString().split("]]"));
        //console.log(data.toString());
        callback(null, data.toString());
    });
    pythonProcess.stderr.on('data', (error) => { //gere les erreurs
        console.error(`stderr: ${error}`);
    });
    pythonProcess.on('close', (code) => { //renvoie la donnée (magie noir)
        if (code !== 0) {
            console.log(`Python script exited with code ${code}`);
            callback(`Error: Script exited with code ${code}`, null);
        } else {
            console.log('Python script executed successfully',data);
            //callback(null, data);
        }
    });
}

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
    const indexHtml = await genererPageAccueil()
  res.send(indexHtml)
})
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    next();
});

app.use(express.static('./Site_avec_back_end/public'))

var data = 0;
io.on('connection', (socket) => {
    console.log('a user connected');
    //socket.emit('chat_message', "gay");
    runPythonScript('./Site_avec_back_end/server/calcul.py', [1], (err, result) => {
        if (err) {
            console.log(err); }
        else {
            data+=1;
            console.log('Données traitées', data);
            socket.emit('chat_message',result)};
    });
});
//démmarage !
server.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
});


// Site bug