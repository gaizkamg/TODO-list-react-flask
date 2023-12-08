import { createTask } from '../apimethods/apimethods';
import { PlusIcon } from '@heroicons/react/24/outline'


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
          <button className="todo-btn" onClick={handleCreateTask}><PlusIcon className='todo-btn-plus'/></button>
        </div>
      </>
    );
  };
  
  export default TaskForm;