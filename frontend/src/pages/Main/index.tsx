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
import React, { useCallback, useEffect, useState } from 'react';
import { Add } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import ProfissionaisList from '../../components/ProfissionaisList';
import api from '../../services/api';
import AddProfissional from '../../components/AddProfissional';

const Main: React.FC = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [tipos, setTipos] = useState<TipoProfissional[]>([]);
  const [toDelete, setToDelete] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<Toast>();
  const getData = useCallback(async () => {
    const response = await api.get<Profissional[]>('/profissional');
    if (response.status === 200) setProfissionais(response.data);
    const responseTipos = await api.get<TipoProfissional[]>('/tipo');
    if (responseTipos.status === 200) setTipos(responseTipos.data);
  }, []);
  const handleDelete = useCallback(async () => {
    if (!toDelete) return;
    const response = await api.delete(`/profissional/${toDelete}`);
    if (response.status === 200) await getData();
    setToDelete(undefined);
  }, [toDelete, getData]);
  useEffect(() => {
    getData();
  }, [getData]);
  const handleAdd = useCallback(
    async ({ nome, telefone, email, tipo }: ProfissionalData) => {
      await api.post('/profissional', {
        nome,
        telefone,
        email,
        tipoDeProfissional: tipo,
      });
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
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Container style={{ marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          <Add />
          ADICIONAR
        </Button>
      </Container>
      <ProfissionaisList
        profissionais={profissionais}
        onDelete={(item) => setToDelete(item)}
      />
      <AddProfissional
        open={modalOpen}
        onAdd={handleAdd}
        tipos={tipos}
        onClose={() => setModalOpen(false)}
      />
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
      <Dialog
        open={!!toDelete}
        onClose={() => setToDelete(undefined)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Remover profissional</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você realmente deseja remover esse profissional? Essa ação não é
            reverssível
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
    </Container>
  );
};

export default Main;
