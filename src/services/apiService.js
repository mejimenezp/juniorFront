import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
    } else {
        toast.error('Error en la solicitud');
    }
    return Promise.reject(error);
});

export const fetchUsuarios = async () => {
    try {
        const response = await api.get('/usuarios/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchRoles = async () => {
    try {
        const response = await api.get('/roles/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPermisos = async () => {
    try {
        const response = await api.get('/permisos/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRoles = async (usuario_id, rol_id) => {
    try {
        await put(`/usuario-roles/${usuario_id}/`, { rol_id: rol_id[0] });
    } catch (error) {
        console.error('Error actualizando roles', error);
    }
};



export const updatePermisos = async (usuario_id, permiso_id) => {
    try {
        await put(`/usuario-permisos/${usuario_id}/`, { permiso_id: permiso_id[0] });
    } catch (error) {
        console.error('Error actualizando permisos', error);
    }
};

export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const remove = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
