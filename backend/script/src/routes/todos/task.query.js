const { pool} = require('../../config/db');

async function get_all_task(todo_id, user_id) {
    let [result] = await pool.query("SELECT task.* FROM task JOIN todo ON todo.id=task.todo_id WHERE task.todo_id = ? AND todo.user_id = ?", [todo_id, user_id]);

    if (result.length === 0) [result] = await pool.query("SELECT task.* FROM task JOIN todo ON todo.id=task.todo_id JOIN shared_todo ON shared_todo.todo_list_id=todo.id WHERE task.todo_id = ? AND shared_todo.user_id", [todo_id, user_id]);
    return result;
}

async function create_task(data) {
    const [verif] = await pool.query("SELECT user_id FROM todo WHERE id = ? AND user_id = ?", [data.todo_id, data.user_id]);
    if (!verif[0]) {return null}

    const [id] = await pool.query("INSERT INTO task (title, description, todo_id) VALUES (?, ?, ?)", [data.title, data.description, data.todo_id]);
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [id.insertId]);
    return result[0];
}

async function change_state_task(task_id, user_id) {
    const [verif] = await pool.query("SELECT * FROM task JOIN todo ON todo.id=task.todo_id WHERE task.id=? AND todo.user_id=?", [task_id, user_id]);
    if (!verif[0]) {return null}

    await pool.query("UPDATE task SET status=IF(status='todo', 'done', 'todo') WHERE id = ?", [task_id]);
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [task_id]);
    return result[0];
}

async function update_task(data) {
    const [verif] = await pool.query("SELECT * FROM task JOIN todo ON todo.id=task.todo_id WHERE task.id = ? AND todo.user_id = ?", [data.task_id, data.user_id]);

    if (!verif[0]) {return null}

    await pool.query("UPDATE task SET title=?, description=? WHERE id=?", [data.title, data.description, data.task_id]);
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [data.task_id]);

    return result[0];
}

async function ratio_todo_verif(task_id) {
    const [todo_id] = await pool.query("SELECT todo.id FROM task JOIN todo ON todo.id=task.todo_id WHERE task.id=?", [task_id]);
    const [result] = await pool.query("SELECT task.status FROM task JOIN todo ON todo.id=task.todo_id WHERE todo.id=?", [todo_id[0].id]);

    let status = "todo";
    let finish = true;
    result.map(task => {
        if (task.status === "done") {
            status = "in progress";
        } else if (task.status === "todo") {
            finish = false;
        }
    })

    await pool.query("UPDATE todo SET status=? WHERE id = ?", [finish ? "done" : status, todo_id[0].id]);
}

async function task_delete(task_id, user_id){
    const [verif] = await pool.query("SELECT * FROM task JOIN todo ON todo.id=task.todo_id WHERE task.id=? AND todo.user_id=?", [task_id, user_id]);
    if (!verif[0]) {return null}

    const [result] = await pool.query("DELETE FROM task WHERE id = ?", [task_id]);
    return result[0];
}
module.exports = { get_all_task, create_task, change_state_task, ratio_todo_verif, update_task, task_delete };