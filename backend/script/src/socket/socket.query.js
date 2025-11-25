const { pool } = require("../config/db");

async function verif_todo_access(user_id, todo_id) {
    let [verif] = await pool.query("SELECT id FROM todo_list WHERE user_id=? AND id=?", [user_id, todo_id]);
    if (!verif[0]) [verif] = await pool.query("SELECT id FROM shared_todo WHERE user_id=? AND todo_list_id=?", [user_id, todo_id]);
    return verif[0]
}

module.exports = { verif_todo_access };