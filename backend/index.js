const express = require('express');
const http = require('http');  // HTTP-Server benötigt für WebSockets
const {Server} = require('socket.io'); 
const app = express();
const path = require('path');
const cors = require('cors');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Offen für alle Domains (für Entwicklung ok)
    methods: ["GET", "POST"]
  }
});



require('dotenv').config();
const PORT = process.env.PORT || 8080;

//BEnutzerdaten im JSON-Format
app.use(express.json())
app.use(cors());

const router = require('./routes/router.js');
app.use('/api', router);

// Neue Route für "/"
app.get('/test', (req, res) => {
    res.json({ message: 'Hallo von deinem Express-Backend!' }); // Sendet ein JSON-Objekt
});

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});


require('./socketHandler')(io); // Importiert die Socket-Logik

// Starte den HTTP-Server
server.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});