const { pool } = require("../../config/db.js");

async function userInformation(userID) {
    const [rows] = await pool.query("SELECT id, email, password, created_at, firstname, name FROM user WHERE id=?", [userID]);
    return rows[0];
}

async function userUpdate(data) {
    if (data.password) {
        const [rows] = await pool.query("UPDATE user SET email=?, password=?, firstname=?, name=? WHERE id=?",
            [data.email, data.password, data.firstname, data.name, data.user_id]);
        return rows[0];
    } else {
        const [rows] = await pool.query("UPDATE user SET email=?, firstname=?, name=? WHERE id=?",
            [data.email, data.firstname, data.name, data.user_id]);
        return rows[0];
    }
}

async function userDelete(userID) {
    const [rows] = await pool.query("DELETE FROM user WHERE id=?", [userID]);
    return rows;
}

module.exports = {userInformation, userUpdate, userDelete};