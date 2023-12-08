import React, { useState, useEffect, useRef } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../apimethods/apimethods';
import { PlusIcon, CheckCircleIcon as CheckCircleOutlineIcon, TrashIcon, PencilSquareIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks mounting component
    fetchTasks();
   
  }, []);

  // Method GET all tasks
  const fetchTasks = async () => {
try {
      const tasksData = await getTasks();
      setTasks(tasksData);
} catch (error) {
  console.error("Error listing tasks:", error.message);
}
  };

  // Method for CREATE
  const handleCreateTask = async () => {
try {
      const createdTask = await createTask({ title: newTaskTitle, description: newTaskDescription });
      setTasks([...tasks, createdTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
} catch (error) {
  console.error("Error creating task:", error.message);
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
      <div
      className="todo-form"
      onSubmit={handleCreateTask}
      >
        <input
          type="text"
          className="todo-input input-title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task"
          required
        />
        <input
          type="text"
          className="todo-input input-description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Description"
        />
        <button  className="todo-btn" onClick={handleCreateTask}><PlusIcon /></button>
    </div>


        <ul className='todo-tasklist'>
          {tasks.slice(0).reverse().map((task) => (
            <li key={task.id} className='todo-card'>
              {editingTask === task.id ? (
                <>
                <div className="todo-header">
                  <input
                    type="text"
                    className="todo-input-title"
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
                  <button className="todo-icon-btn icon-margin-left" onClick={() => handleSaveEdit(task.id, task.title, task.description)}><ArchiveBoxArrowDownIcon /></button>
                  
                </>
              ) : (
                <>
                  <div className="todo-header">
                    <button  className='todo-icon-btn' onClick={() => handleUpdateTask(task.id, !task.is_done)}>
                        {task.is_done ? <CheckCircleSolidIcon className='todo-icon'/> : <CheckCircleOutlineIcon className='todo-icon'/>}
                      </button>
                      <p className={task.is_done ? 'todo-isdone todo-title' : 'todo-isNot todo-title' }>
                        {task.title}
                      </p>
                      <button className='todo-icon-btn' onClick={() => handleEditClick(task.id)}><PencilSquareIcon className='todo-icon'/></button>
                      <button className='todo-icon-btn color-warning' onClick={() => handleDeleteTask(task.id)}><TrashIcon className='todo-icon'/></button>
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