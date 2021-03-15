import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import AddTipo from '../../components/AddTipo';
import TiposList from '../../components/TiposList';
import api from '../../services/api';

const Tipos: React.FC = () => {
  const [tipos, setTipos] = useState<TipoProfissional[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<string>();
  const [toast, setToast] = useState<Toast>();
  const getData = useCallback(async () => {
    const response = await api.get<TipoProfissional[]>('/tipo');
    if (response.status === 200) setTipos(response.data);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  const handleDelete = useCallback(async () => {
    if (!toDelete) return;
    const response = await api.delete(`/tipo/${toDelete}`);
    if (response.status === 200) {
      await getData();
      setToDelete(undefined);
      setToast({
        type: 'success',
        description: 'Tipo deletado com sucesso',
      });
    }
  }, [toDelete, getData]);
  const handleAdd = useCallback(
    async (descricao: string) => {
      if (descricao.length < 5) {
        setToast({
          type: 'error',
          description: 'O tipo precisa ter no mínimo 5 catacteres',
        });
        setModalOpen(false);
        return;
      }
      await api.post('/tipo', { descricao });
      setToast({
        type: 'success',
        description: 'Tipo adicionado com sucesso',
      });
      await getData();
      setModalOpen(false);
    },
    [getData]
  );
  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Container style={{ marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setModalOpen(true)}
        >
          <Add fontSize="small" />
          ADICIONAR
        </Button>
      </Container>
      <TiposList tipos={tipos} onDelete={(e) => setToDelete(e)} />
      <AddTipo
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        onAdd={handleAdd}
      />
      <Dialog
        open={!!toDelete}
        onClose={() => setToDelete(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Remover tipo de profissional
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você realmente deseja remover esse tipo? Essa ação não é reverssível
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(undefined)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!toast}
        autoHideDuration={6000}
        onClose={() => setToast(undefined)}
      >
        <Alert
          onClose={() => setToast(undefined)}
          severity={toast?.type || 'error'}
        >
          {toast?.description}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Tipos;
