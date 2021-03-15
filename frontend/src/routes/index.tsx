import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../pages/Main';
import Tipos from '../pages/Tipos';

const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Main} />
      <Route path="/tipos" exact component={Tipos} />
    </>
  );
};

export default Routes;
