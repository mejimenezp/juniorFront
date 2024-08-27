import React, { useState, useEffect } from 'react';
import { fetchPermisos, post, put, remove } from '../services/apiService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';

function PermissionManagement() {
    const [permisos, setPermisos] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPermiso, setCurrentPermiso] = useState({ id: null, nombre: '', descripcion: '' });

    useEffect(() => {
        loadPermisos();
    }, []);

    const loadPermisos = async () => {
        try {
            const permisosData = await fetchPermisos();
            setPermisos(permisosData);
        } catch (error) {
            console.error('Error al cargar permisos', error);
            toast.error('Error al cargar permisos');
        }
    };

    const handleSave = async () => {
        try {
            if (currentPermiso.id) {
                await put(`/permisos/${currentPermiso.id}/`, currentPermiso);
                toast.success('Permiso actualizado con éxito');
            } else {
                await post('/permisos/', currentPermiso);
                toast.success('Permiso creado con éxito');
            }
            loadPermisos();
            handleClose();
        } catch (error) {
            console.error('Error al guardar permiso', error);
            toast.error('Error al guardar permiso');
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(`/permisos/${id}/`);
            toast.success('Permiso eliminado con éxito');
            loadPermisos();
        } catch (error) {
            console.error('Error al eliminar permiso', error);
            toast.error('Error al eliminar permiso');
        }
    };

    const handleOpen = (permiso = { id: null, nombre: '', descripcion: '' }) => {
        setCurrentPermiso(permiso);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2>Gestión de Permisos</h2>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Crear Permiso
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
                        {permisos.map(permiso => (
                            <TableRow key={permiso.id}>
                                <TableCell>{permiso.nombre}</TableCell>
                                <TableCell>{permiso.descripcion}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(permiso)}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(permiso.id)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentPermiso.id ? 'Editar Permiso' : 'Crear Permiso'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={currentPermiso.nombre}
                        onChange={(e) => setCurrentPermiso({ ...currentPermiso, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={currentPermiso.descripcion}
                        onChange={(e) => setCurrentPermiso({ ...currentPermiso, descripcion: e.target.value })}
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

export default PermissionManagement;
