import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  open: boolean;
  onAdd: (descricao: string) => void;
}

const AddTipo: React.FC<Props> = ({ onClose, open, onAdd }) => {
  const [descricao, setDescricao] = useState('');

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Adicionar tipo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Insira qual a descrição do novo tipo
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Tipo"
          type="text"
          fullWidth
          onChange={(e) => setDescricao(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button color="primary" onClick={() => onAdd(descricao)}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTipo;
