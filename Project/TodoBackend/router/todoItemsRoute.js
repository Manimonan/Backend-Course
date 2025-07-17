const express = require('express');
const itemsRouter = express.Router();

const todoitemController = require('../Controller/todoItemController');


itemsRouter.get('/',todoitemController.getTodoItems);
itemsRouter.post('/items', todoitemController.createTodoItem);

module.exports = itemsRouter;