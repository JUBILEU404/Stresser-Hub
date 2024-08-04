const Database = require('better-sqlite3');
const db = new Database('stresser_hub.db');

// Criar tabelas
db.exec(`
CREATE TABLE IF NOT EXISTS repository (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    created_at TEXT,
    updated_at TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    plan TEXT DEFAULT 'none',
    concurrents INTEGER DEFAULT 0,
    expiry_date TEXT DEFAULT '',
    created_at TEXT
);

CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    state TEXT,
    created_at TEXT,
    updated_at TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pull_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    state TEXT,
    created_at TEXT,
    updated_at TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS commits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    author TEXT,
    created_at TEXT
);

CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    last_commit_id INTEGER,
    FOREIGN KEY (last_commit_id) REFERENCES commits(id)
);

CREATE TABLE IF NOT EXISTS attacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    host TEXT,
    port INTEGER,
    time INTEGER,
    method TEXT,
    response TEXT,
    created_at TEXT
);
`);

module.exports = db;
