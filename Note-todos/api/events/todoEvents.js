const { eventBus, eventsType } = require("./eventBus");
const statistController = require("../controllers/statistController")
const todoType = eventsType.todoEvents;

eventBus.on(todoType.CREATE, (count) => {
    statistController.increaseTodo(count.created, count.completed);
});

eventBus.on(todoType.DELETE, (count) => {
    statistController.decreaseTodo(count.deleted);
});

eventBus.on(todoType.UPDATE, (count) => {
    statistController.updateTodo(count.completed);
});
