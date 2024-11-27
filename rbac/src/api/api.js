import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (data) => axios.post(`${API_URL}/users`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

export const getRoles = () => axios.get(`${API_URL}/roles`);
export const addRole = (data) => axios.post(`${API_URL}/roles`, data);
export const updateRole = (id, data) => axios.put(`${API_URL}/roles/${id}`);
export const deleteRole = (id) => axios.delete(`${API_URL}/roles/${id}`);
