import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { toast } from 'react-toastify'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const storedRoles = JSON.parse(localStorage.getItem('userRoles')) || [];
            const storedPermissions = JSON.parse(localStorage.getItem('userPermissions')) || [];
            const storedUsername = localStorage.getItem('username');
            if (accessToken) {
                setRoles(storedRoles);
                setPermissions(storedPermissions);
                setUser({ username: storedUsername });
            }
        };
        checkAuth();
    }, []);

    const loginUser = async (credentials) => {
        try {
            const data = await login(credentials);
            const { roles, permissions, username } = data;
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('userRoles', JSON.stringify(roles));
            localStorage.setItem('userPermissions', JSON.stringify(permissions));
            localStorage.setItem('username', credentials.username);
            
            setUser({ username });
            setRoles(roles);
            setPermissions(permissions);
            
            navigate('/dashboard');
            toast.success('Inicio de sesión exitoso');
        } catch (error) {
            console.error('Error de autenticación', error);
            toast.error('Error de autenticación'); 
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('userPermissions');
        setUser(null);
        setRoles([]);
        setPermissions([]);
        navigate('/');
        toast.info('Has cerrado sesión');
    };

    return (
        <AuthContext.Provider value={{ user, roles, permissions, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
