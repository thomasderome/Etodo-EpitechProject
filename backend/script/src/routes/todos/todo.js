const express = require('express');
const router = express.Router();
const { get_all_todo, create_todo, change_state_todo, ratio_todo_list_verif, update_todo, todo_delete } = require('./todo.query.js');

router.get('/:id_todo_list', async (req, res) => {
    const {id_todo_list} = req.params;
    if (!id_todo_list || typeof id_todo_list !== "string") throw new TypeError()

    const todo_list = await get_all_todo(id_todo_list, req.user_id);

    res.send(todo_list);
})

router.post('/', async (req, res) => {
    const {title, description, due_time, todo_list_id} = req.body;

    if (typeof title !== "string" || typeof description !== "string" || typeof due_time !== "string" || typeof todo_list_id !== "number" || !description || !title || !due_time || !todo_list_id) { throw new TypeError() }

    const response = await create_todo({
        "title": title,
        "description": description,
        "due_time": due_time,
        "todo_list_id": todo_list_id,
        "user_id": req.user_id
    });

    if (response === null) return res.status(403).send();
    await ratio_todo_list_verif(response.id)
    res.status(200).send(response);
})

router.put('/:todo_id', async (req, res) => {
    const { title, description, due_time } = req.body;
    const todo_id = req.params.todo_id;

    if (typeof title !== "string" ||  typeof description !== "string" || typeof due_time !== "string") { throw new TypeError() }

    const result = await update_todo({
        "title": title,
        "description": description,
        "due_time": due_time,
        "todo_id": todo_id,
        "user_id": req.user_id,
    });

    if (!result) return res.status(403).send();

    return res.send(result);
})

router.patch('/check/:todo_id', async (req, res) => {
    const todo_id = req.params.todo_id;
    if (!todo_id) { throw new TypeError() }

    const todo = await change_state_todo(todo_id, req.user_id);
    if (!todo) return res.status(403).send();

    await ratio_todo_list_verif(todo_id)

    res.send(todo);
})

router.delete('/:todo_id', async (req, res) => {
    const todoDelete = await todo_delete(req.params.todo_id, req.user_id);

    res.send(todoDelete);
})

module.exports = router;