const express = require('express');
const http = require('http');  // HTTP-Server benötigt für WebSockets
const {Server} = require('socket.io'); 
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:8081" },
});



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


require('./socketHandler')(io); // Importiert die Socket-Logik

// Starte den HTTP-Server
server.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});