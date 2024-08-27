import api from './apiService';

export const login = async (credentials) => {
    try {
        const response = await api.post('/token/', credentials);
        const { access, refresh, roles, permissions, username} = response.data;
        
        console.log('Roles:', roles);
        console.log('Permissions:', permissions);

        if (!access || !refresh) {
            throw new Error('Tokens not found in the response');
        }
        localStorage.setItem('username', username);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        
        if (roles) {
            localStorage.setItem('userRoles', JSON.stringify(roles));
        } else {
            localStorage.removeItem('userRoles');
        }

        if (permissions) {
            localStorage.setItem('userPermissions', JSON.stringify(permissions));
        } else {
            localStorage.removeItem('userPermissions');
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};