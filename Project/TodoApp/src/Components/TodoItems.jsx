import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick }) => {
  return (
    <div className="space-y-4"> {/* Adds vertical space between each TodoItem */}
      {todoItems.map((item) => (
        <TodoItem
          key={item.name} 
          todoDate={item.todoDate}
          dueTime={item.dueTime}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;