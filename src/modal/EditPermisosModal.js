import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

function EditPermisosModal({ open, permisos, selectedPermisos, onSave, onClose, onSelectPermisos }) {
    const handlePermisoChange = (event) => {
        const { value } = event.target;
        onSelectPermisos(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Permisos</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Permisos</InputLabel>
                    <Select
                        multiple
                        value={selectedPermisos}
                        onChange={handlePermisoChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {permisos.map(permiso => (
                            <MenuItem key={permiso.id} value={permiso.id}>
                                <Checkbox checked={selectedPermisos.indexOf(permiso.id) > -1} />
                                {permiso.nombre}
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

export default EditPermisosModal;
