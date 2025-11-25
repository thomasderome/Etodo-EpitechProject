const express = require("express");
const router = express.Router();
const {displayTodos, viewTodo, createTodo, updateTodo, deleteTodo} = require("./todos.query.js")

router.get("/", async(req , res ) => {
    const todos = await displayTodos(req.user_id);

    res.send(todos);
})

router.get("/:id", async(req , res ) => {
    const todo = await viewTodo(req.params.id, req.user_id);

    if (todo) {
        res.send(todo)
    } else {
        res.status(404).send()
    }
})

router.post("/", async(req, res) =>{
    const {title, status} = req.body;
    if (typeof title !== "string" || typeof status !== "string" || !title || !status) {
        throw new TypeError( );
    }
    const newTodo = await createTodo({
            title: title,
            user_id : req.user_id,
            status: status
    })

    const todos = await viewTodo(newTodo.insertId, req.user_id);
    res.send(todos);
})

router.put("/:id", async(req, res) =>{
    const {title, status} = req.body;
    const todoId = req.params.id;

    const updatetodo = await updateTodo({
        title: title,
        user_id : req.user_id,
        status: status,
        todo_id: todoId
    })

    const todo = await viewTodo(req.params.id, req.user_id);
    if (todo) {
        res.send(todo)
    } else {
        res.status(403).send()
    }
})

router.delete("/:id", async(req, res) =>{
    const todoDelete = await deleteTodo(req.params.id, req.user_id)
    if (todoDelete) {
        res.send({msg: `Successfully deleted record number : ${req.params.id}`});
    } else {
        res.status(403).send()
    }
})

module.exports = router;
