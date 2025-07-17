const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    todoName:{
        type: String,
        required: true,
    },
    todoDate: {
        type: Date,
        required: true,
    },
    dueTime: {
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }

})
const TodoItem = mongoose.model('TodoItem', todoItemSchema);
module.exports = TodoItem;