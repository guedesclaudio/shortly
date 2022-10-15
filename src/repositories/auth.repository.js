import connection from "../database/database.js"

async function queryUser(email) {
    return (await connection.query("SELECT * FROM users WHERE email = $1;", [email])).rows[0]
}

function insertUser(name, email, encryptedPassword) {
    return connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)", [name, email, encryptedPassword])
}

function insertSession(id, token) {
    return connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [id, token])
}

async function querySessions() {
    return (await connection.query("SELECT * FROM sessions;")).rows
}

function deleteSession(id) {
    return connection.query("DELETE FROM sessions WHERE id = $1;",[id])
}

export {queryUser, insertUser, insertSession, querySessions, deleteSession}