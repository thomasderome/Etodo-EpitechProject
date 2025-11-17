const { pool} = require('../../config/db');

async function get_all_task(todo_id, user_id) {
    const [result] = await pool.query("SELECT * FROM task JOIN todo ON todo.id=task.todo_id WHERE task.todo_id = ? AND todo.user_id = ?", [todo_id, user_id]);
    return result;
}

async function create_task(data) {
    const [verif] = await pool.query("SELECT user_id FROM todo WHERE id = ? AND user_id = ?", [data.todo_id, data.user_id]);
    if (!verif[0]) {return null}

    const [id] = await pool.query("INSERT INTO task (title, description, todo_id) VALUES (?, ?, ?)", [data.title, data.description, data.todo_id]);
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [id.insertId]);
    return result[0];
}

module.exports = { get_all_task, create_task };