const express = require('express');
const router = express.Router();
const { get_all_task, create_task } = require('./task.query.js');

router.get('/:id', async (req, res) => {
    const task_list = await get_all_task(req.params.id, req.user_id);

    res.send(task_list);
})

router.post('/', async (req, res) => {
    const {title, description, todo_id} = req.body;

    //if (typeof title !== "string" || description !== "string" || typeof todo_id !== "number" || !description || !title || !todo_id) { throw new TypeError() }

    const response = await create_task({
        "title": title,
        "description": description,
        "todo_id": todo_id,
        "user_id": req.user_id
    });

    if (response === null) return res.status(403).send();
    res.status(200).send(response);
})

module.exports = router;