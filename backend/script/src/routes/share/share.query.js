const { pool } = require("../../config/db");

async function create_share(data) {
    const [verif] = await pool.query("SELECT id FROM todo_list WHERE id=? AND user_id=?", [data.todo_id, data.user_id]);
    if (!verif[0]) return null;

    const [user_share] = await pool.query("SELECT id FROM user WHERE email=?", [data.email_share]);
    const [verif_share_exist] = await pool.query("SELECT user_id FROM shared_todo WHERE user_id=? AND todo_list_id=?", [user_share[0].id, data.todo_id]);
    if (verif_share_exist[0]) return null

    const [id] = await pool.query("INSERT INTO shared_todo (user_id, todo_list_id, mode) VALUES (?, ?, ?)", [user_share[0].id, data.todo_id, data.mode]);
    const [user] = await pool.query("SELECT user.email, shared_todo.mode, shared_todo.id FROM shared_todo JOIN user ON user.id=shared_todo.user_id WHERE shared_todo.id = ?", [id.insertId]);
    return user[0]
}

async function get_setting(user_id, todo_list_id) {
    const verif = await pool.query("SELECT id FROM todo_list WHERE user_id=? AND id=?", [user_id, todo_list_id]);
    if (!verif[0]) return null;

    const [result] = await pool.query("SELECT shared_todo.id, shared_todo.mode, user.email FROM shared_todo JOIN user ON user.id=shared_todo.user_id WHERE shared_todo.todo_list_id=?", [todo_list_id]);
    return result
}

async function get_share(user_id) {
    const [result] = await pool.query("SELECT shared_todo.*, todo_list.title, todo_list.status FROM shared_todo JOIN todo_list ON todo_list.id=shared_todo.todo_list_id WHERE shared_todo.user_id=?", [user_id]);
    return result;
}

async function get_user_in_share(todo_list_id, user_id) {
    const [verif] = await pool.query("SELECT * FROM shared_todo WHERE user_id=? AND todo_list_id=?", [user_id, todo_list_id]);

    const [all_user_share] = await pool.query("SELECT * FROM shared_todo WHERE todo_list_id=?", [todo_list_id]);
    const [owner] = await pool.query("SELECT user_id FROM todo_list WHERE id=?", [todo_list_id]);

    let all_data_user = {"users": [], "owner": {}};
    all_user_share.map(async (item) => {
        console.log(item.user_id);
        const [user_data] = await pool.query("SELECT firstname, email FROM user WHERE id=?", [item.user_id]);
        all_data_user.users.push(user_data[0]);
    })
    const [user_data] = await pool.query("SELECT firstname, email FROM user WHERE id=?", [owner[0].user_id]);
    all_data_user.owner = user_data[0];

    return all_data_user;
}

async function change_mode(share_id, user_id) {
    const [verif] = await pool.query("SELECT * FROM shared_todo JOIN todo_list ON todo_list.id=shared_todo.todo_list_id WHERE todo_list.user_id=? AND shared_todo.id", [user_id, share_id]);
    if (!verif[0]) return null;

    await pool.query("UPDATE shared_todo SET mode=IF(mode, false, true) WHERE id=?", [share_id]);
}

async function remove_share(data) {
    const [verif] = await pool.query("SELECT * FROM shared_todo JOIN todo_list ON todo_list.id=shared_todo.todo_list_id WHERE todo_list.user_id=? AND shared_todo.id", [data.user_id, data.share_id]);
    if (!verif[0]) return null;

    await pool.query("DELETE FROM shared_todo WHERE id = ?", [data.share_id]);
}

module.exports = {create_share, get_share, get_user_in_share, remove_share, get_setting, change_mode};