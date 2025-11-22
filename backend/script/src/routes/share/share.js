const express = require("express");
const router = express.Router();
const {create_share, get_share, get_user_in_share, remove_share, get_setting, change_mode} = require("./share.query");

// ROUTE FOR GET ALL TODO LIST SHARE
router.get("/", async (req, res) => {
    const response = await get_share(req.user_id);
    res.status(200).send(response);
})

// ROUTE FOR GET ALL USER IN TODO_LIST
router.get("/:todo_list_id", async (req, res) => {
    const response = await get_user_in_share(Number(req.params.todo_list_id), req.user_id);

    if (response === null) return res.status(403).send()
    res.status(200).send(response);
})

// ALL ROUTE FOR MANAGE SHARE SYSTEM
// GET SETTING
router.get("/setting/:todo_list_id", async (req, res) => {
    const todo_list_id = Number(req.params.todo_list_id);
    const user_id = req.user_id;

    if (!user_id || typeof user_id !== "string" || !todo_list_id || typeof todo_list_id !== "number") throw new TypeError();

    const result = await get_setting(user_id, todo_list_id);

    if (result === null) return res.status(403).send();
    res.status(200).send(result);
})

// CHANGE MOD EDIT
router.patch("/setting/:share_id", async (req, res) => {
    const result = await change_mode(req.params.share_id, req.user_id);

    if (result === null) return res.status(403).send();
    res.status(204).send();
})

// DELETE SHARE FOR SPECIFIC USER
router.delete("/setting/:share_id", async (req, res) => {
    const response = await remove_share({
        user_id: req.user_id,
        share_id: req.params.share_id
    });

    if (response === null) return res.status(403).send();
    res.status(204).send();
})

// ROUTE FOR CREATE SHARE
router.post("/setting", async (req, res) => {
    const { todo_list_id, mode, email } = req.body;
    const user_id = req.user_id;

    const response = await create_share({
        user_id: user_id,
        mode: mode,
        email_share: email,
        todo_id: todo_list_id,
    })

    if (response === null) return res.status(403).send()
    res.status(200).send(response);
})

module.exports = router;