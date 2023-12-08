import React, { useState } from 'react';
import { getTasks, updateTask, deleteTask } from '../apimethods/apimethods';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPenToSquare, faCircleCheck, faTrashCan, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";



const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);

  // Method GET all tasks
  const fetchTasks = async () => {
try {
      const tasksData = await getTasks();
      setTasks(tasksData);
} catch (error) {
  console.error("Error listing tasks:", error.message);
}
  };


  // Method for UPDATE COMPLETION 
  const handleUpdateTask = async (taskId, isDone) => {
   try {
     const updatedTaskData = await updateTask(taskId, { is_done: isDone });
     setTasks(tasks.map((task) => (task.id === taskId ? updatedTaskData : task)));
   } catch (error) {
    console.error("Error checking task as done:", error.message);
   }
  };

 // Method for DELETE 
  const handleDeleteTask = async (taskId) => {
try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
} catch (error) {
  console.error("Error deleting task:", error.message);
  
}
  };

  // Method for EDIT CLICK  
  const handleEditClick = (taskId) => {
    setEditingTask(taskId);
  };


  // Method for SAVE EDITION
  const handleSaveEdit = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await updateTask(taskId, { title: updatedTitle, description: updatedDescription });
      setEditingTask(null);
      fetchTasks(); // Reload tasks after edition
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  };


  return (
    <>
      <ul className={`todo-tasklist`}>
      
          {tasks.slice(0).reverse().map((task) => (
            <li key={task.id} className='todo-card'>
              {editingTask === task.id ? (
                <>
                <div className="todo-header">
                  <input
                    type="text"
                    className= "todo-input-title"
                    value={task.title}
                    onChange={(e) => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, title: e.target.value } : t)))}
                  />
                  </div>
                  <textarea
                    type="text"
                    className="todo-input-edit"
                    value={task.description}
                    onChange={(e) => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, description: e.target.value } : t)))}
                    />
                  <button className="todo-icon-btn icon-margin-left" onClick={() => handleSaveEdit(task.id, task.title, task.description)}><FontAwesomeIcon className='todo-icon' icon={faFloppyDisk} /></button>
                  
                </>
              ) : (
                <>
                  <div className="todo-header">
                    <button  className='todo-icon-btn checked' onClick={() => handleUpdateTask(task.id, !task.is_done)}>
                        {task.is_done ?       <FontAwesomeIcon className='todo-icon' icon={faCircleCheck} />
 : <FontAwesomeIcon className='todo-icon' icon={faCircleCheck} />}
                      </button>
                      <p className={task.is_done ? 'todo-isdone todo-title' : 'todo-isNot todo-title' }>
                        {task.title}
                      </p>
                      <button className='todo-icon-btn' onClick={() => handleEditClick(task.id)}><FontAwesomeIcon className='todo-icon' icon={faPenToSquare} /></button>
                      <button className='todo-icon-btn color-warning' onClick={() => handleDeleteTask(task.id)}><FontAwesomeIcon className='todo-icon' icon={faTrashCan} /></button>
                  </div>
                  <div className={ task.is_done ? 'todo-isdone todo-tasklist-description' : 'todo-isNot todo-tasklist-description' }> {task.description} </div>
                 
             
                </>
              )}
            </li>
          ))}
        </ul>


      
    </>
  );
};

export default TaskList;