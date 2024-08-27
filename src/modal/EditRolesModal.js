import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

function EditRolesModal({ open, roles, selectedRoles, onSave, onClose, onSelectRoles }) {
    const handleRoleChange = (event) => {
        const { value } = event.target;
        onSelectRoles(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Roles</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Roles</InputLabel>
                    <Select
                        multiple
                        value={selectedRoles}
                        onChange={handleRoleChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {roles.map(role => (
                            <MenuItem key={role.id} value={role.id}>
                                <Checkbox checked={selectedRoles.indexOf(role.id) > -1} />
                                {role.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditRolesModal;
