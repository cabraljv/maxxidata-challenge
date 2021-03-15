import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation().pathname.split('/');
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          Maxxidata
        </Typography>
        {location[1] === 'tipos' ? (
          <Button size="small" onClick={() => history.push('/')}>
            Profissionais
          </Button>
        ) : (
          <Button size="small" onClick={() => history.push('/tipos')}>
            Tipos
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
