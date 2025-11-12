const express = require("express");
const router = express.Router();
const {displayTodos, viewTodo, createTodo} = require("./todos.query.js")


router.get("/todos", async(req , res ) => {
    const todos = await displayTodos(req.user_id);

    res.send(todos);
})

router.get("/todos/:id", async(req , res ) => {
    const todo = await viewTodo(req.params.id, req.user_id);

    if (todo) {
        res.send(todo)
    } else {
        res.status(404).send()
    }
})

router.post("/todos", async(req, res) =>{
    const newTodo = await createTodo()
})

router.put("/todos/:id", async(req, res) =>{

})

router.delete("/todos/:id", async(req, res) =>{

})

module.exports = router;
