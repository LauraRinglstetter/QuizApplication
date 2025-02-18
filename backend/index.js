const express = require('express');
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

app.listen(PORT, () => console.log("Server running on port " + PORT));