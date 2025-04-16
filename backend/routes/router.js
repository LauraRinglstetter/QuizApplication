const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');


const db = require('../lib/db.js');

// Middleware
const userMiddleware = require('../middleware/users.js');

// POST /register
router.post('/register', userMiddleware.validateRegister, async(req, res) => {
    try {
        const [existingUsers] = await db.query(
            `SELECT id FROM users WHERE LOWER(username) = LOWER(?)`,
            [req.body.username]
        );

        if (existingUsers.length) {
            return res.status(409).send("Der Benutzername ist bereits vergeben");
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        await db.query(
            `INSERT INTO users (username, password, registered, last_login) 
            VALUES (?, ?, now(), now())`,
            [req.body.username, hash]
        );
        return res.status(201).send({ message: 'Registered!' });
    } catch (err) {
        console.error('Fehler bei Registrierung:', err);
        return res.status(500).send({ message: 'Interner Serverfehler' });
    }
});

// POST /login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and Password are required!' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (!users.length) {
            return res.status(400).send({ message: 'Username oder Passwort falsch!' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send({ message: 'Benutzer oder Passwort nicht korrekt' });
        }

        const token = jwt.sign(
            { username: user.username, userId: user.id },
            process.env.JWT_SECRET_KEY || 'default_secret',
            { expiresIn: '2h' }
        );

        await db.query('UPDATE users SET last_login = now() WHERE id = ?', [user.id]);

        return res.status(200).send({
            message: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        });

    } catch (err) {
        console.error('Login-Fehler:', err);
        return res.status(500).send({ message: 'Interner Serverfehler' });
    }
});

// POST /start
router.post('/start', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is secret content');
});

// Route für das Abrufen der Quizfragen
router.get('/questions', async (req, res) => {
    const { category } = req.query; // Kategorie aus der Anfrage extrahieren
    if (!category) {
        return res.status(400).json({ message: 'Kategorie nicht angegeben' });
    }

    try {
        const [results] = await db.query('SELECT * FROM questions WHERE category = ?', [category]);
        res.json(results); // Gibt die Fragen als JSON zurück
    } catch (err) {
        console.error('Fehler beim Abrufen der Fragen:', err);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Fragen' });
    }
});

// Route für das Abrufen der Kategorien
router.get('/categories', (req, res) => {
    const query = 'SELECT DISTINCT category FROM questions'; // SQL-Abfrage, um alle Kategorien abzurufen
    db.query(query, (err, results) => {
      if (err) {
        console.error('Fehler beim Abrufen der Kategorien:', err);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Kategorien' });
      }
      res.json(results); // Gibt die Kategorien als JSON zurück
    });
});

// Route für das Hinzufügen von Fragen
router.post('/questions', (req, res) => {
    console.log("Eingehende Anfrage:", req.body); // Debugging-Ausgabe

    const { question, options, answer, category } = req.body;

    if (!question || !options || answer === undefined || !category) {
        console.log('Alle Felder sind erforderlich!', req.body);
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    const query = 'INSERT INTO questions (question, options, answer, category) VALUES (?, ?, ?, ?)';
    const values = [question, JSON.stringify(options), answer, category];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Fehler beim Speichern der Frage:', err);
            return res.status(500).json({ message: 'Fehler beim Speichern der Frage' });
        }
        res.status(201).json({ message: 'Frage erfolgreich hinzugefügt!' });
    });
});


// Route für das Abrufen der Bestenliste
router.get('/leaderboard', (req, res) => {
    const query = 'SELECT username, score FROM users ORDER BY score DESC LIMIT 10'; // Sortiere nach Punktestand absteigend, max. 10 Einträge
    db.query(query, (err, results) => {
      if (err) {
        console.error('Fehler beim Abrufen der Bestenliste:', err);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Bestenliste' });
      }
      res.json(results); // Gibt die Benutzer und Punktestände als JSON zurück
    });
  });
  router.put('/leaderboard', async (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
        return res.status(400).json({ message: 'Username oder Score fehlen' });
    }

    try {
        const [result] = await db.query('UPDATE users SET score = score + ? WHERE username = ?', [score, username]);
        res.status(200).json({ message: 'Punktestand erfolgreich aktualisiert' });
    } catch (err) {
        console.error('Fehler beim Speichern des Punktestands:', err);
        return res.status(500).json({ message: 'Fehler beim Speichern des Punktestands' });
    }
});

// API-Endpunkt für das Abrufen des Punktestands des Benutzers
router.get('/users/score/:id', (req, res) => {
    const userId = req.params.id; // id aus der URL extrahieren

    // SQL-Abfrage zum Abrufen des Benutzers anhand der id
    const query = 'SELECT score FROM users WHERE id = ?'; // Verwende `id` als Spaltenname

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Fehler bei der Datenbankabfrage:', err);
            return res.status(500).json({ message: 'Fehler beim Abrufen des Scores' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        // Benutzer gefunden, Punktestand zurückgeben
        const score = results[0].score;
        res.json({ score });
    });
});



module.exports = router;
