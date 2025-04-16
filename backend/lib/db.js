const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000 // 10 Sekunden Timeout
});

module.exports = pool;