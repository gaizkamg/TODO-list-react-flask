import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faPlus } from "@fortawesome/free-solid-svg-icons";



const TaskForm = ({ newTaskTitle, newTaskDescription, setNewTaskTitle, setNewTaskDescription, handleCreateTask }) => {

  
    // Handle ENTER KEY press for submit the form
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleCreateTask();
      }
    };
  
    return (
      <>
        <div className="todo-form" onSubmit={handleCreateTask}>
          <input
            type="text"
            className="todo-input input-title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task"
            required
            onKeyDown={handleKeyPress}
          />
          <input
            type="text"
            className="todo-input input-description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Description"
            onKeyDown={handleKeyPress}
          />
          <button className="todo-plus-btn" onClick={handleCreateTask}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
        </div>
      </>
    );
  };
  
  export default TaskForm;