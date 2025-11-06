const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require("../../config/db.js");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || typeof email !== "string"
        || !password || typeof password !== "string") throw new TypeError();

    const [result, fields] = await pool.query('SELECT password FROM user WHERE email=?', [email]);
    if (result.length === 0) res.status(401).send({"msg": "Invalid Credentials"});
    else {
        const hashedPassword = await bcrypt.hash(result[0].password, 12);
        const comparePassword = await bcrypt.compare(password, hashedPassword);

        if (comparePassword) {
            res.send('login');
        } else res.status(401).send({"msg": "Invalid Credentials"});
    }
})

module.exports = router;
