const express = require("express");
const router = express.Router();
const {userInformation, allUserTask} = require("./user.query.js")

router.get("/user", async (req, res) => {
    const user = await userInformation(req.user_id);
    res.send(user);
})

router.get("/user/todos", async (req, res) => {
    const task = await allUserTask(req.user_id);
    res.send(task);
})

module.exports = router;