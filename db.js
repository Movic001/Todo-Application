const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./todo.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    done text BOOLEAN NOT NULL DEFAULT 0
    )`, (err) => {
     if (err) {
         console.error('Error creating table:', err.message);
    } else {
         console.log('todo table created Sucessfully!!!!.');
    }
        });
    });

    module.exports =db
    