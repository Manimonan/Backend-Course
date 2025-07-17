function TodoItem({ todoName, todoDate,dueTime ,onDeleteClick }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-stone-500 shadow-md mb-3 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105">
      <div className="flex flex-col text-left mr-4">
        <div className="text-lg font-semibold text-gray-800">{todoName}</div>
        <div className="text-sm text-gray-500 mt-1">Date : {todoDate}</div>
        <div className="text-sm text-gray-500 mt-1">Time to do :{dueTime}</div>
      </div>
      <div>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => onDeleteClick(todoName)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;