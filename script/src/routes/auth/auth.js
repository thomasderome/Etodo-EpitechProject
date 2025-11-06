const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require("../../config/db.js");
const bcrypt = require("bcryptjs"); // hasheur mdp
const router = express.Router();

router.post("/register", async(req, res) => {
    //verif arg
    const {email, password, name, firstname} = req.body;

    if (typeof email !== "string" || typeof password !== "string" || typeof name !== "string" || typeof firstname !== "string" || !email || !password || !name || !firstname) {
        throw new TypeError();
    }

    let [result, fields] = await pool.query('SELECT email FROM user WHERE email=?', [email]);

    if (result.length !== 0) {
        res.status(401).send({ "msg": "Account already exists"})
    } else {
        const hash = await bcrypt.hash(password, 12);
        let id = crypto.randomUUID();

        [result, fields] = await pool.query('SELECT id FROM user WHERE id=?', [id]);

        while (result.lenght !== (0 || undefined)) {
            id = crypto.randomUUID();
        }
        [result, fields] = await pool.query('INSERT INTO user (id, email, password, name, firstname) VALUES (?, ?, ?, ?, ?)', [id, email, hash, name, firstname])

        res.send(result)
    }


});

module.exports = router;

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
