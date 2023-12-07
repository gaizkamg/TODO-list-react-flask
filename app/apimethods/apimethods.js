import axios from 'axios';

const API_BASE_URL = '/api';

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener tareas:", error.message);
        throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
};

export const getTaskID = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error al acceder al ID:", error.message);
        throw error;
    }
};


export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        console.error("Error al crear la tarea")
        throw error;
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la tarea:", error.message);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
        return response.data;

    } catch (error) {
        console.error("Error al borrar la tarea:", error.message);
        throw error;
    }
};