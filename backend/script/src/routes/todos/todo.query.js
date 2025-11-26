const { pool} = require('../../config/db');

async function get_all_todo(todo_list_id, user_id) {
    let [result] = await pool.query("SELECT todo.* FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.todo_list_id = ? AND todo_list.user_id = ?", [todo_list_id, user_id]);

    if (result.length === 0) [result] = await pool.query("SELECT todo.* FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id JOIN shared_todo ON shared_todo.todo_list_id=todo_list.id WHERE todo.todo_list_id = ? AND shared_todo.user_id=?", [todo_list_id, user_id]);
    return result;
}

async function create_todo(data) {
    let [verif] = await pool.query("SELECT user_id FROM todo_list WHERE id = ? AND user_id = ?", [data.todo_list_id, data.user_id]);
    if (!verif[0]) verif = await pool.query("SELECT user_id FROM shared_todo WHERE todo_list_id = ? AND user_id = ? AND mode=1", [data.todo_list_id, data.user_id]);
    if (!verif[0]) {return null}

    const [id] = await pool.query("INSERT INTO todo (title, description, due_time, todo_list_id) VALUES (?, ?, ?, ?)", [data.title, data.description, data.due_time, data.todo_list_id]);
    const [result] = await pool.query("SELECT * FROM todo WHERE id = ?", [id.insertId]);
    return result[0];
}

async function change_state_todo(todo_id, user_id) {
    let [verif] = await pool.query("SELECT * FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.id=? AND todo_list.user_id=?", [todo_id, user_id]);
    if (!verif[0]) verif = await pool.query("SELECT user_id FROM shared_todo WHERE todo_list_id = ? AND user_id = ? AND mode=1", [data.todo_list_id, data.user_id]);
    if (!verif[0]) {return null}

    await pool.query("UPDATE todo SET status=IF(status='todo', 'done', 'todo') WHERE id = ?", [todo_id]);
    const [result] = await pool.query("SELECT * FROM todo WHERE id = ?", [todo_id]);
    return result[0];
}

async function update_todo(data) {
    let  [verif] = await pool.query("SELECT * FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.id = ? AND todo_list.user_id = ?", [data.todo_id, data.user_id]);
    if (!verif[0]) verif = await pool.query("SELECT user_id FROM shared_todo WHERE todo_list_id = ? AND user_id = ? AND mode=1", [data.todo_list_id, data.user_id]);
    if (!verif[0]) {return null}

    await pool.query("UPDATE todo SET title=?, description=?, due_time=? WHERE id=?", [data.title, data.description, data.due_time, data.todo_id]);
    const [result] = await pool.query("SELECT * FROM todo WHERE id = ?", [data.todo_id]);

    return result[0];
}

async function ratio_todo_list_verif(todo_id) {
    const [todo_list_id] = await pool.query("SELECT todo_list.id FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.id=?", [todo_id]);
    const [result] = await pool.query("SELECT todo.status FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo_list.id=?", [todo_list_id[0].id]);

    let status = "todo";
    let finish = true;
    result.map(todo => {
        if (todo.status === "done") {
            status = "in progress";
        } else if (todo.status === "todo") {
            finish = false;
        }
    })

    await pool.query("UPDATE todo_list SET status=? WHERE id = ?", [finish ? "done" : status, todo_list_id[0].id]);
}

async function todo_delete(todo_id, user_id){
    let [verif] = await pool.query("SELECT * FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.id=? AND todo_list.user_id=?", [todo_id, user_id]);
    if (!verif[0]) verif = await pool.query("SELECT user_id FROM shared_todo WHERE todo_list_id = ? AND user_id = ? AND mode=1", [data.todo_list_id, data.user_id]);
    if (!verif[0]) {return null}

    const [result] = await pool.query("DELETE FROM todo WHERE id = ?", [todo_id]);
    return result[0];
}

async function get_todolist_id(todo_id) {
    const [id] = await pool.query("SELECT todo_list.id FROM todo JOIN todo_list ON todo_list.id=todo.todo_list_id WHERE todo.id=?", [todo_id])
    return id[0].id
}
module.exports = { get_all_todo, create_todo, change_state_todo, ratio_todo_list_verif, update_todo, todo_delete, get_todolist_id };