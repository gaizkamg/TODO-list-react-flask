import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 

export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const getTaskID = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  };


export const createTask = async (task) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la tarea:", error.message);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};