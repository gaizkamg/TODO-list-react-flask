"use client";
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { createTask, getTasks } from './apimethods/apimethods';



export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    fetchTasks(); // get tasks while loading the components
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

  return (
    <>
      <main className='main'>     
      <TaskForm
        newTaskTitle={newTaskTitle}
        newTaskDescription={newTaskDescription}
        setNewTaskTitle={setNewTaskTitle}
        setNewTaskDescription={setNewTaskDescription}
        handleCreateTask={handleCreateTask}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
      />
          </main>
    </>
  );
};

