import './App.css';

import React, { Suspense } from 'react';
import Router from './services/Router';

import LancamentoResource from './services/resource/lancamentoResource';

const heroku = () => {
  const service = new LancamentoResource();
  setInterval( function() {
    service.heroku();
  }, 30000 );
}

function App() {
  return (
    <Suspense fallback={<h1>Carregando</h1>}>
      {heroku()}
        <Router />
    </Suspense>
  );
}

export default App;
