import React, { useState, useEffect } from 'react';
import { fetchUsuarios, fetchRoles, fetchPermisos, post, put, remove, updateRoles, updatePermisos } from '../services/apiService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel, Box  } from '@mui/material';
import EditRolesModal from '../modal/EditRolesModal';
import EditPermisosModal from '../modal/EditPermisosModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserManagement() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openRolesModal, setOpenRolesModal] = useState(false);
    const [openPermisosModal, setOpenPermisosModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedPermisos, setSelectedPermisos] = useState([]);

    useEffect(() => {
        loadUsuarios();
        loadRoles();
        loadPermisos();
    }, []);

    const loadUsuarios = async () => {
        try {
            const usuariosData = await fetchUsuarios();
            setUsuarios(usuariosData);
        } catch (error) {
            console.error('Error al cargar usuarios', error);
            toast.error('No se pudieron cargar los usuarios. Por favor, intente nuevamente más tarde.');
        }
    };

    const loadRoles = async () => {
        try {
            const rolesData = await fetchRoles();
            setRoles(rolesData);
        } catch (error) {
            console.error('Error al cargar roles', error);
            toast.error('No se pudieron cargar los roles. Por favor, intente nuevamente más tarde.');
        }
    };

    const loadPermisos = async () => {
        try {
            const permisosData = await fetchPermisos();
            setPermisos(permisosData);
        } catch (error) {
            console.error('Error al cargar permisos', error);
            toast.error('No se pudieron cargar los permisos. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleOpenUserModal = (user) => {
        setCurrentUser(user);
        setOpenUserModal(true);
    };

    const handleCloseUserModal = () => {
        setOpenUserModal(false);
    };

    const handleOpenRolesModal = (user) => {
        setCurrentUser(user);
        setSelectedRoles(user.roles || []);
        setOpenRolesModal(true);
    };

    const handleCloseRolesModal = () => {
        setOpenRolesModal(false);
    };

    const handleOpenPermisosModal = (user) => {
        setCurrentUser(user);
        setSelectedPermisos(user.permisos || []);
        setOpenPermisosModal(true);
    };

    const handleClosePermisosModal = () => {
        setOpenPermisosModal(false);
    };

    const handleSaveUser = async () => {
        try {
            if (currentUser.id) {
                await put(`/usuarios/${currentUser.id}/`, currentUser);
            } else {
                await post('/usuarios/', currentUser);
            }
            loadUsuarios();
            handleCloseUserModal();
            toast.success('Usuario guardado con éxito.');
        } catch (error) {
            console.error('Error al guardar usuario', error);
            toast.error('No se pudo guardar el usuario. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleSaveRoles = async () => {
        try {
            await updateRoles(currentUser.id, selectedRoles);
            loadUsuarios();
            handleCloseRolesModal();
            toast.success('Roles actualizados con éxito.');
        } catch (error) {
            console.error('Error al actualizar roles', error);
            toast.error('No se pudieron actualizar los roles. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleSavePermisos = async () => {
        try {
            await updatePermisos(currentUser.id, selectedPermisos);
            loadUsuarios();
            handleClosePermisosModal();
            toast.success('Permisos actualizados con éxito.');
        } catch (error) {
            console.error('Error al actualizar permisos', error);
            toast.error('No se pudieron actualizar los permisos. Por favor, intente nuevamente más tarde.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await remove(`/usuarios/${userId}/`);
            loadUsuarios();
            toast.success('Usuario eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar usuario', error);
            toast.error('No se pudo eliminar el usuario. Por favor, intente nuevamente más tarde.');
        }
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <Button variant="contained" color="primary" onClick={() => handleOpenUserModal(null)}>
                Crear Usuario
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map(usuario => (
                            <TableRow key={usuario.id}>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>{usuario.username}</TableCell>
                            <TableCell>{usuario.nombre}</TableCell>
                            <TableCell>{usuario.permisos}</TableCell>
                            <TableCell>
                                <Box display="flex" flexDirection="column" gap={1}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Button variant="contained" color="primary" onClick={() => handleOpenUserModal(usuario)}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={() => handleOpenPermisosModal(usuario)}>
                                            Editar Permisos
                                        </Button>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Button variant="contained" color="primary" onClick={() => handleOpenRolesModal(usuario)}>
                                            Editar Roles
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(usuario.id)}>
                                            Eliminar
                                        </Button>
                                        
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openUserModal} onClose={handleCloseUserModal}>
                <DialogTitle>{currentUser?.id ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre Completo"
                        type="nombre"
                        fullWidth
                        value={currentUser?.nombre || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, nombre: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={currentUser?.email || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="username"
                        fullWidth
                        value={currentUser?.username || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        value={currentUser?.password || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={currentUser?.is_active || false} onChange={(e) => setCurrentUser({ ...currentUser, is_active: e.target.checked })} />}
                        label="Activo"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={currentUser?.is_staff || false} onChange={(e) => setCurrentUser({ ...currentUser, is_staff: e.target.checked })} />}
                        label="Staff"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUserModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveUser} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            <EditRolesModal
                open={openRolesModal}
                roles={roles}
                selectedRoles={selectedRoles}
                onSave={handleSaveRoles}
                onClose={handleCloseRolesModal}
                onSelectRoles={setSelectedRoles}
            />

            <EditPermisosModal
                open={openPermisosModal}
                permisos={permisos}
                selectedPermisos={selectedPermisos}
                onSave={handleSavePermisos}
                onClose={handleClosePermisosModal}
                onSelectPermisos={setSelectedPermisos}
            />
        </div>
    );
}

export default UserManagement;
