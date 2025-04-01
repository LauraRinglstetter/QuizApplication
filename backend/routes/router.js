const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');


const db = require('../lib/db.js');

// Middleware
const userMiddleware = require('../middleware/users.js');

// POST /register
router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
    db.query(`SELECT id FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)})`, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }

        if (result.length) {
            return res.status(409).send("Der Benutzername ist bereits vergeben");
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        message: err,
                    });
                } else {
                    db.query(
                        `INSERT INTO users (id, username, password, registered, last_login) 
                        VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, '${hash}', now(), now());`,
                        (err, result) => {
                            if (err) {
                                return res.status(400).send({
                                    message: err,
                                });
                            }
                            return res.status(201).send({
                                message: 'Registered!',
                            });
                        }
                    );
                }
            });
        }
    });
});

// POST /login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Überprüfen, ob die erforderlichen Parameter vorhanden sind
    if (!username || !password) {
        return res.status(400).send({
            message: 'Username and Password are required!',
        });
    }

    // Sicheres Query mit Platzhaltern (Prepared Statement)
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({
                message: 'Internal server error',
            });
        }

        if (!result.length) {
            return res.status(400).send({
                message: 'Username oder Passwort falsch!',
            });
        }

        // Passwort-Validierung mit bcrypt
        bcrypt.compare(password, result[0].password, (bErr, bResult) => {
            if (bErr || !bResult) {
                console.error('Password compare error:', bErr); 
                return res.status(400).send({
                    message: 'Benutzer oder Passwort nicht korrekt',
                });
            }

            // Token generieren
            const token = jwt.sign(
                {
                    username: result[0].username,
                    userId: result[0].id,
                },
                process.env.JWT_SECRET_KEY || 'default_secret',
                { expiresIn: '2h' }
            );

            // Letztes Login-Datum aktualisieren
            db.query('UPDATE users SET last_login = now() WHERE id = ?', [result[0].id]);

            // Erfolgsantwort senden
            return res.status(200).send({
                message: 'Logged in successfully',
                token,
                user: {
                    id: result[0].id,
                    username: result[0].username,
                    // Füge weitere notwendige Felder hinzu, aber nicht `password`
                },
            });
        });
    });
});


// POST /start
router.post('/start', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is secret content');
});

// Route für das Abrufen der Quizfragen
router.get('/questions', (req, res) => {
    const { category } = req.query; // Kategorie aus der Anfrage extrahieren
    if (!category) {
        return res.status(400).json({ message: 'Kategorie nicht angegeben' }); // Fehlermeldung, wenn keine Kategorie angegeben ist
      }
    const query = 'SELECT * FROM questions WHERE category = ?'; // SQL-Abfrage, um alle Fragen abzurufen
    db.query(query, [category], (err, results) => {
      if (err) {
        console.error('Fehler beim Abrufen der Fragen:', err);
        return res.status(500).json({ message: 'Fehler beim Abrufen der Fragen' });
      }
      res.json(results); // Gibt die Fragen als JSON zurück
    });
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
//API um den Punktestand in der Datenbank zu speichern
  router.put('/leaderboard', (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({ message: 'Username oder Score fehlen' });
    }
  
    const query = 'UPDATE users SET score = score + ? WHERE username = ?';
    db.query(query, [score, username], (err, result) => {
      if (err) {
        console.error('Fehler beim Speichern des Punktestands:', err);
        return res.status(500).json({ message: 'Fehler beim Speichern des Punktestands' });
      }
      res.status(200).json({ message: 'Punktestand erfolgreich aktualisiert' });
    });
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
