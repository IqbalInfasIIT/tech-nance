const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tNdb.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS transactions (amount REAL, category TEXT)');
});

module.exports = db;
