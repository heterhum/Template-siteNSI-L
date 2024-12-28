const express = require('express')
const { spawn } = require('node:child_process');
const app = express()
const PORT = 5000

// Genere page html de l'acceuil + css + js +img ect ...
app.get('/', async(req, res) => {
  res.sendFile("C:/Users/xoxar/Desktop/perso/code/Template-siteNSI/Site_avec_API/public/main.html")
})

app.use('/styles',express.static('../public/styles'))
app.use('/img',express.static('../public/img'))

//permet de recevoir et enovyé des json depuis /submit
app.use(express.json())
app.post('/submit', async (req, res) => {
    const data = await req.body; // Les données envoyées par le js public via fetch()
    console.log('Données reçues:', data["value"]);
    res.send(data["value"])
  });


//démmarage !
app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`)
})