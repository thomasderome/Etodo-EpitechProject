const express = require("express");
const router = express.Router();
const {create_share, get_share, get_user_in_share, remove_share, get_setting} = require("./share.query");

// ROUTE FOR CREATE SHARE
router.post("/", async (req, res) => {
    const { todo_id, mode, email_share } = req.body;
    const user_id = req.user_id;
    if (user_id === req.user_id) res.status(403).send()
    const response = await create_share({
        user_id: user_id,
        mode: mode,
        email_share: email_share,
        todo_id: todo_id,
    })

    if (response === null) res.status(403).send()
    else res.status(200).send(response);
})

// ROUTE FOR GET ALL TODO LIST SHARE
router.get("/", async (req, res) => {
    const response = await get_share(req.user_id);
    res.status(200).send(response);
})

router.get("/setting/:todo_list_id", async (req, res) => {
    const { todo_list_id } = req.params;
    const user_id = req.user_id;

    const result = get_setting(user_id, todo_list_id);
    if (result === null) res.status(403).send();
    else res.status(200).send(result);
})

// ROUTE FOR GET ALL USER IN TODO_LIST
router.get("/:todo_list_id", async (req, res) => {
    const response = await get_user_in_share(Number(req.params.todo_list_id), req.user_id);

    if (response === null) res.status(403).send()
    else res.status(200).send(response);
})

// DELETE SHARE FOR SPECIFIC USER
router.delete("/", async (req, res) => {
    const { user_remove_share, todo_list_id } = req.body;

    const response = await remove_share({
        user_id: req.user_id,
        user_remove_share: user_remove_share,
        todo_list_id: todo_list_id,
    });

})

module.exports = router;