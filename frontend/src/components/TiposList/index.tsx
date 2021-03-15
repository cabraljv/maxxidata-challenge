import { Card, IconButton } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import React, { useMemo } from 'react';

interface Props {
  tipos: TipoProfissional[];
  onDelete: (id: string) => void;
}

const TiposList: React.FC<Props> = ({ tipos, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'descricao', headerName: 'Descrição', width: 250 },
    {
      field: 'id',
      headerName: 'Ações',
      renderCell: (params: GridCellParams) => (
        <IconButton onClick={() => onDelete(`${params.value}`)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      tipos.map((item) => ({
        ...item,
      })),
    [tipos]
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

export default TiposList;
