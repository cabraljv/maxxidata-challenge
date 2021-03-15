import { Card, IconButton } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import React, { useMemo } from 'react';
import { Delete } from '@material-ui/icons';

interface Props {
  profissionais: Profissional[];
  onDelete: (id: string) => void;
}

const ProfissionaisList: React.FC<Props> = ({ profissionais, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 200, resizable: true },
    { field: 'telefone', headerName: 'Telefone', width: 170, resizable: true },
    { field: 'email', headerName: 'Email', width: 250, resizable: true },
    { field: 'tipo', headerName: 'Tipo', width: 120, resizable: true },
    {
      field: 'id',
      width: 120,
      headerName: 'Ações',
      resizable: true,
      renderCell: (params: GridCellParams) => (
        <IconButton onClick={() => onDelete(`${params.value}`)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      profissionais.map((item) => ({
        ...item,
        tipo: item.tipoDeProfissional.descricao,
        acoes: item,
      })),
    [profissionais]
  );

  return (
    <Card>
      <div style={{ height: 550, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          density="compact"
          disableColumnSelector
        />
      </div>
    </Card>
  );
};

export default ProfissionaisList;
