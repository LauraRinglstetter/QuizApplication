const express = require('express');
const http = require('http');  // HTTP-Server benötigt für WebSockets
const socketIo = require('socket.io'); 
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

//BEnutzerdaten im JSON-Format
app.use(express.json())
app.use(cors());

const router = require('./routes/router.js');
app.use('/api', router);

// Neue Route für "/"
router.get('/test', (req, res) => {
    res.json({ message: 'Hallo von deinem Express-Backend!' }); // Sendet ein JSON-Objekt
  });

// Erstellt einen HTTP-Server und verbindet ihn mit Express
const server = http.createServer(app);

// Erstelle eine Socket.io-Instanz und verbinde sie mit dem HTTP-Server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8081",  // Frontend-URL (anpassen, falls anders)
    methods: ["GET", "POST"]
  }
});

// WebSocket-Verbindung aufbauen
io.on('connection', (socket) => {
  console.log('Ein Benutzer hat sich verbunden:', socket.id);

  // Ereignis, wenn ein Spieler eine Nachricht sendet
  socket.on('sendMessage', (msg) => {
    console.log('Nachricht von ' + socket.id + ':', msg);
    // Broadcast die Nachricht an alle verbundenen Clients
    io.emit('receiveMessage', { userId: socket.id, message: msg });
  });

  // Ereignis, wenn ein Spieler die Verbindung trennt
  socket.on('disconnect', () => {
    console.log('Benutzer hat sich getrennt:', socket.id);
  });
});

// Starte den HTTP-Server
server.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});