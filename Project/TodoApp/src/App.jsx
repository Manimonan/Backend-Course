import { useState } from "react";
import "./App.css"; // Keep your base CSS for any global styles if needed, though Tailwind often replaces much of it.
import AddTodo from "./Components/AddTodo";
import TodoItems from "./Components/TodoItems";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const handleNewItem = (itemName, itemtodoDate,dueTime) => {
    const newTodoItems = [
      ...todoItems,
      { name: itemName, todoDate: itemtodoDate ,dueTime :dueTime },
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = (todoItemName) => {
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> {/* Centered background */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl"> {/* Card-like container */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">My Daily Tasks 📝</h1>
        <p className="text-gray-600 text-center mb-6">Enter your tasks below to keep track!</p>
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-8 p-4 bg-gray-50 rounded-md">
            No tasks for today! Add some above. 😊
          </p>
        ) : (
          <TodoItems
            todoItems={todoItems}
            onDeleteClick={handleDeleteItem}
          ></TodoItems>
        )}
      </div>
    </div>
  );
}

export default App;