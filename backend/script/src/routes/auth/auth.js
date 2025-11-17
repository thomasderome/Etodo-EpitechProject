const express = require('express');
const bcrypt = require('bcryptjs'); // hasheur mdp
const { pool } = require("../../config/db.js");
const router = express.Router();
const jwt = require("jsonwebtoken");

function generate_token(req, res, user_id) {
    const token = jwt.sign({"id": user_id}, process.env.SECRET);

    res.send({"token": token});
}

router.post("/register", async(req, res) => {
    //verif arg
    const {email, password, name, firstname} = req.body;
    console.log(name, email, password, firstname);
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

        while (result.length !== 0) {
            id = crypto.randomUUID();
            [result, fields] = await pool.query('SELECT id FROM user WHERE id=?', [id]);
        }

        [result, fields] = await pool.query('INSERT INTO user (id, email, password, name, firstname) VALUES (?, ?, ?, ?, ?)', [id, email, hash, name, firstname])

        generate_token(req, res, id);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || typeof email !== "string"
        || !password || typeof password !== "string") throw new TypeError();
    const [result, fields] = await pool.query('SELECT password, id FROM user WHERE email=?', [email]);

    if (result.length === 0) res.status(401).send({"msg": "Invalid Credentials"});
    else {
        const comparePassword = await bcrypt.compare(password, result[0].password);

        if (comparePassword) {
            generate_token(req, res, result[0].id);
        } else res.status(401).send({"msg": "Invalid Credentials"});
    }
})

module.exports = router;
