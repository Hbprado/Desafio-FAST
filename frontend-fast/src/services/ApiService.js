import axios from 'axios';

const API_URL = 'http://localhost:5192/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const ApiService = {
    getColaboradores: () => axios.get(`${API_URL}/colaboradores`, { headers: getAuthHeader() }),
    getWorkshops: () => axios.get(`${API_URL}/workshops`, { headers: getAuthHeader() }),
    getWorkshopById: (id) => axios.get(`${API_URL}/workshops/${id}`, { headers: getAuthHeader() }),
};
