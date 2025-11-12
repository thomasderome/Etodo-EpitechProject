const { pool } = require("../../config/db.js");

async function displayTodos(userID) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE user_id=?", [userID])
    return rows;
}

async function viewTodo(todoID, userID){
    const [rows] = await pool.query("SELECT * FROM todo WHERE id=? AND user_id=?", [todoID,userID])
    return rows[0];
}

async function createTodo(userID){
    const [rows] = await pool.query("INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)")
}

module.exports = {displayTodos, viewTodo, createTodo}