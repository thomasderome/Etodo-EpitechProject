const { pool } = require("../../config/db.js");

async function displayTodos(userID) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE user_id=?", [userID])
    return rows;
}

async function viewTodo(todoID, userID){
    const [rows] = await pool.query("SELECT * FROM todo WHERE id=? AND user_id=?", [todoID,userID])
    return rows[0];
}

async function createTodo(data){
    const [rows] = await pool.query("INSERT INTO todo (title, user_id, status) VALUES (?, ?, ?)", [data.title, data.user_id, data.status])
    return rows;
}

async function updateTodo(data){
    const [rows] = await pool.query("UPDATE todo SET title=?, status =? WHERE id=? AND user_id=?",
        [data.title, data.status, data.todo_id, data.user_id]);

    return rows[0];
}

async function deleteTodo(todoID, userID){
    const [rows] = await pool.query("DELETE FROM todo WHERE id=? AND user_id=?", [todoID, userID]);
    return rows;
}

module.exports = {displayTodos, viewTodo, createTodo, updateTodo, deleteTodo}