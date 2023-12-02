import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Cargar tareas al montar el componente
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasksData = await getTasks();
    setTasks(tasksData);
  };

  const handleCreateTask = async () => {
    const createdTask = await createTask({ title: newTaskTitle, description: newTaskDescription });
    setTasks([...tasks, createdTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleUpdateTask = async (taskId, isDone) => {
    const updatedTaskData = await updateTask(taskId, { is_done: isDone });
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTaskData : task)));
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditClick = (taskId) => {
    setEditingTask(taskId);
  };

  const handleSaveEdit = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await updateTask(taskId, { title: updatedTitle, description: updatedDescription });
      setEditingTask(null);
      fetchTasks(); // Recargar tareas después de la edición
    } catch (error) {
      console.error("Error al guardar la edición:", error.message);
    }
  };

  return (
    <>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editingTask === task.id ? (
                <>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, title: e.target.value } : t)))}
                  />
                  <input
                    type="text"
                    value={task.description}
                    onChange={(e) => setTasks(tasks.map((t) => (t.id === task.id ? { ...t, description: e.target.value } : t)))}
                  />
                  <button onClick={() => handleSaveEdit(task.id, task.title, task.description)}>Guardar</button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}>
                    {task.title} 
                  </span>
                  <div> {task.description} </div>
                  <button onClick={() => handleUpdateTask(task.id, !task.is_done)}>
                    {task.is_done ? 'Marcar Incompleta' : 'Marcar Completa'}
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                  <button onClick={() => handleEditClick(task.id)}>Editar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Descripcion"
        />
        <button onClick={handleCreateTask}>Crear Tarea</button>
      </div>
    </>
  );
};

export default TaskList;