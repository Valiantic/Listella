
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});


export const fetchTodos = async () => {
    const response = await apiClient.get('/todos');
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await apiClient.post('/todos', todo);
    return response.data;
}

export const updateTodo = async (Id, updateTodo) => {
    const reponse = await apiClient.put(`/todos/${Id}`, updateTodo);
    return response.data;
}

export const deleteTodo = async (id) => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
}