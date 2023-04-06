import React from 'react';
import { Container } from '@mui/material';
import { AppDrawer } from './pages/AppDrawer';
import { Switch } from './features/Switch';

function App() {
  return (
    <div>
      <main>
        <AppDrawer />
        <Container maxWidth='xl'>
          <Switch />
        </Container>
      </main>
    </div>
  );
}

export default App;
