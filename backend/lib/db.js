const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

// Versuche, die Verbindung herzustellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err.stack);
        return;
    }
    console.log('Erfolgreich mit der MySQL-Datenbank verbunden.');
});
module.exports = connection;