import React, { useState, useEffect } from 'react';
import { fetchRoles, post, put, remove } from '../services/apiService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RoleManagement() {
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState({ id: null, nombre: '', descripcion: '' });

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
        } catch (error) {
            console.error('Error al cargar roles', error);
            toast.error('No se pudieron cargar los roles. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleSave = async () => {
        try {
            if (currentRole.id) {
                await put(`/roles/${currentRole.id}/`, currentRole);
            } else {
                await post('/roles/', currentRole);
            }
            loadRoles();
            handleClose();
            toast.success('Rol guardado con éxito.');
        } catch (error) {
            console.error('Error al guardar rol', error);
            toast.error('No se pudo guardar el rol. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(`/roles/${id}/`);
            loadRoles();
            toast.success('Rol eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar rol', error);
            toast.error('No se pudo eliminar el rol. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleOpen = (role = { id: null, nombre: '', descripcion: '' }) => {
        setCurrentRole(role);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2>Gestión de Roles</h2>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Crear Rol
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map(rol => (
                            <TableRow key={rol.id}>
                                <TableCell>{rol.nombre}</TableCell>
                                <TableCell>{rol.descripcion}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(rol)}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(rol.id)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentRole.id ? 'Editar Rol' : 'Crear Rol'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={currentRole.nombre}
                        onChange={(e) => setCurrentRole({ ...currentRole, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={currentRole.descripcion}
                        onChange={(e) => setCurrentRole({ ...currentRole, descripcion: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RoleManagement;
