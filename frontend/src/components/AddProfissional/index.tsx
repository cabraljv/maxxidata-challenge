import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';

interface Props {
  onClose: () => void;
  open: boolean;
  onAdd: (params: ProfissionalData) => void;
  tipos: TipoProfissional[];
}

const AddProfissional: React.FC<Props> = ({ onClose, open, onAdd, tipos }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleClose = useCallback(() => {
    setNome('');
    setEmail('');
    setTelefone('');
    setTipo('');
    onClose();
  }, [onClose]);
  const handleAdd = useCallback(async () => {
    const schema = Yup.object().shape({
      nome: Yup.string().min(5).required(),
      email: Yup.string().email().required(),
      telefone: Yup.string().strict().min(8).required(),
      tipo: Yup.string().min(10).required(),
    });
    try {
      await schema.validate(
        {
          nome,
          email,
          telefone,
          tipo,
        },
        { abortEarly: false }
      );
      onAdd({ nome, email, telefone, tipo });
      setNome('');
      setEmail('');
      setTelefone('');
      setTipo('');
    } catch (error) {
      let aux: string[] = [];
      error.inner.forEach((item: { path: string }) => {
        if (!aux.includes(item.path)) aux.push(item.path);
      });
      setErrors(aux);
    }
  }, [onAdd, email, nome, telefone, tipo]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Adicionar profissional</DialogTitle>
      <DialogContent>
        <form noValidate>
          <TextField
            autoFocus
            margin="dense"
            error={errors.includes('nome')}
            label="Nome"
            type="text"
            fullWidth
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            error={errors.includes('email')}
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Telefone"
            error={errors.includes('telefone')}
            type="text"
            fullWidth
            onChange={(e) => setTelefone(e.target.value)}
          />
          <div>
            <FormControl style={{ minWidth: 200, marginTop: 8 }}>
              <InputLabel id="tipo-profissional-label">
                Tipo do profissional
              </InputLabel>
              <Select
                labelId="tipo-profissional-label"
                id="tipo=profissional-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as string)}
              >
                {tipos.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button color="primary" onClick={handleAdd}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProfissional;
