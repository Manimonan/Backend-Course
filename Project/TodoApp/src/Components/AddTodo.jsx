import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [todoDate, settodoDate] = useState("");
  const [dueTime, setDueTime] = useState(""); // New state for time

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    settodoDate(event.target.value);
  };

  const handleTimeChange = (event) => { // New handler for time input
    setDueTime(event.target.value);
  };

  const handleAddButtonClicked = () => {
    // Add basic validation to ensure all fields are filled
    if (todoName.trim() === "" || todoDate.trim() === "" || dueTime.trim() === "") {
      alert("Please enter a todo item, a due date, and a due time.");
      return;
    }
    // Pass the time along with the name and date
    onNewItem(todoName, todoDate, dueTime);
    settodoDate(""); // Clear input after adding
    setTodoName(""); // Clear input after adding
    setDueTime(""); // Clear input after adding
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Enter Todo Here"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        value={todoName}
        onChange={handleNameChange}
      />
      <input
        type="date"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        value={todoDate}
        onChange={handleDateChange}
      />
      <input // New time input field
        type="time"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        value={dueTime}
        onChange={handleTimeChange}
      />
      <button
        type="button"
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full sm:w-auto"
        onClick={handleAddButtonClicked}
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;