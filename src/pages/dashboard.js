import React, { useState } from 'react';
import { Button } from '@mui/material';
import UserManagement from '../components/UserManagement';
import RoleManagement from '../components/RoleManagement';
import PermissionManagement from '../components/PermissionManagement';
import '../styles/Dashboard.css'; // Importa el archivo CSS
import { toast } from 'react-toastify';

function Dashboard() {
    const [activeComponent, setActiveComponent] = useState('users');

    const handleComponentChange = (component) => {
        setActiveComponent(component);
        toast.info(`Cambiado a ${component === 'users' ? 'Usuarios' : component === 'roles' ? 'Roles' : 'Permisos'}`);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'users':
                return <UserManagement />;
            case 'roles':
                return <RoleManagement />;
            case 'permissions':
                return <PermissionManagement />;
            default:
                return <UserManagement />;
        }
    };

    return (
        <div className="dashboard-root">
            <h1 className="dashboard-header">Dashboard</h1>
            <div className="dashboard-actions">
                <Button className="dashboard-button" variant="contained" onClick={() => handleComponentChange('users')}>
                    Gestionar Usuarios
                </Button>
                <Button className="dashboard-button" variant="contained" onClick={() => handleComponentChange('roles')}>
                    Gestionar Roles
                </Button>
                <Button className="dashboard-button" variant="contained" onClick={() => handleComponentChange('permissions')}>
                    Gestionar Permisos
                </Button>
            </div>
            {renderComponent()}
        </div>
    );
}

export default Dashboard;
