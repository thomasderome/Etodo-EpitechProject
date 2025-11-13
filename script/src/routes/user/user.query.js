const { pool } = require("../../config/db.js");

async function userInformation(userID) {
    const [rows] = await pool.query("SELECT id, email, password, created_at, firstname, name FROM user WHERE id=?", [userID]);
    return rows[0];
}

async function allUserTask(userID) {

}

module.exports = {userInformation, allUserTask};