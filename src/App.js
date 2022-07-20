import './App.css';

import React, { Suspense } from 'react';
import Router from './services/Router';

function App() {
  return (
    <Suspense fallback={<h1>Carregando</h1>}>
        <Router />
    </Suspense>
  );
}

export default App;
