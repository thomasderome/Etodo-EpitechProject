const express = require("express");
const router = express.Router();
const {userInformation, userUpdate, userDelete} = require("./user.query.js")
const bcrypt = require("bcryptjs");
const {deleteTodo} = require("../todos/todos.query");

router.get("/", async (req, res) => {
    const user = await userInformation(req.user_id);
    res.send(user);
})

router.put("/:id", async (req, res) => {
    const {email, password, created_at, firstname, name} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const updateUser = await userUpdate({
        user_id: req.user_id,
        email: email,
        password: hash,
        created_at: created_at,
        firstname: firstname,
        name: name,
    });
    const user = await userInformation(req.user_id);
    res.send(user);
})

router.delete("/:id", async (req, res) => {
    const deleteUser = await userDelete(req.user_id)
        if (deleteUser) {
            res.send({msg: `Successfully deleted record number : ${req.user_id}`});
        } else {
            res.status(403).send()
        }
})

module.exports = router;