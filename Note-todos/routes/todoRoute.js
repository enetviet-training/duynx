const express = require('express');
const router = express.Router();
const { setupTodos } = require("../api/controllers/setupController");
const todoController = require("../api/controllers/todoController");
const {logRequest} = require("../middleWare/logRequest")

router.use(logRequest);

/* Setup */
router.get("/setupTodos", setupTodos)

/***********************************/

/* Todos */

/* Get all Todos */
router.get("/todos", todoController.getAllTodos)

/* Get a todo */
router.get("/todo/:id", todoController.getOneTodo)

/* Get statist */
router.get("/todos/statist", todoController.getStatist)

/* Create a todo */
router.post("/todo", todoController.createTodo)

/* Update a todo */
router.put("/todo", todoController.updateTodos);

/* Delete a todo */
router.delete("/todo/:id", todoController.deleteTodo)

/* Delete all Todos */
router.delete("/todos/deleteAll", todoController.deleteAllTodos)

module.exports = router;
