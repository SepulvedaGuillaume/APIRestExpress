import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "good_corner.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

export default db;