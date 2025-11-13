const { pool } = require("../../config/db.js");

async function userInformation(userID) {
    const [rows] = await pool.query("SELECT id, email, created_at, firstname, name FROM user WHERE id=?", [userID]);
    return rows[0];
}

module.exports = {userInformation}