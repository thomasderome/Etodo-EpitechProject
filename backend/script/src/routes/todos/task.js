const express = require('express');
const router = express.Router();
const { get_all_task, create_task, change_state_task, ratio_todo_verif, update_task } = require('./task.query.js');

router.get('/:id_todo', async (req, res) => {
    const task_list = await get_all_task(req.params.id_todo, req.user_id);

    res.send(task_list);
})

router.post('/', async (req, res) => {
    const {title, description, todo_id} = req.body;

    if (typeof title !== "string" || typeof description !== "string" || typeof todo_id !== "number" || !description || !title || !todo_id) { throw new TypeError() }

    const response = await create_task({
        "title": title,
        "description": description,
        "todo_id": todo_id,
        "user_id": req.user_id
    });

    if (response === null) return res.status(403).send();
    res.status(200).send(response);
})

router.put('/:task_id', async (req, res) => {
    const { title } = req.body;
    const task_id = req.params.task_id;

    if (typeof title !== "string" || !title ) { throw new TypeError() }

    const result = await update_task({
        "title": title,
        "task_id": task_id,
        "user_id": req.user_id
    });

    if (!result) return res.status(403).send();

    return res.send(result);
})

router.patch('/check/:task_id', async (req, res) => {
    const task_id = req.params.task_id;
    if (!task_id) { throw new TypeError() }

    const task = await change_state_task(task_id, req.user_id);
    if (!task) return res.status(403).send();

    await ratio_todo_verif(task.todo_id)

    res.send(task);
})

module.exports = router;