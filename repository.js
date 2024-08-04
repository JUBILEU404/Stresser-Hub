const db = require('./database');

function addUser(username, email, password) {
    const stmt = db.prepare('INSERT INTO users (username, email, password, plan, concurrents, expiry_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(username, email, password, 'none', 0, null, new Date().toISOString());
}

function getUsers() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
}

function updateUser(id, plan, concurrents, expiry_date) {
    const stmt = db.prepare('UPDATE users SET plan = ?, concurrents = ?, expiry_date = ? WHERE id = ?');
    stmt.run(plan, concurrents, expiry_date, id);
}

function getUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
}

function getUserByUsernameAndPassword(username, password) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    return stmt.get(username, password);
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    getUserById,
    getUserByUsernameAndPassword
};
