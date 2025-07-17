const TodoItem = require("../model/todoItems")


exports.getTodoItems = (req, res, next) => {
    // Logic to retrieve todo items from the database
    res.status(200).json({
        message: "Todo items retrieved successfully",
        // todoItems: [] // This would be replaced with actual todo items from the database
    });
}
exports.createTodoItem = (req, res, next) => {
    const { todoName, todoDate, dueTime } = req.body;

    const newTodoItem = new TodoItem({
        todoName,
        todoDate,
        dueTime
    });

    newTodoItem.save()
        .then(() => {
            res.status(201).json({
                message: "Todo item created successfully",
                todoItem: newTodoItem
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error creating todo item",
                error: error.message
            });
        });
}