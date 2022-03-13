import React from 'react';
import { Container } from '@mui/material';
import { Scraper } from './features/scraper/Scraper';

function App() {
  return (
    <div>
      <main>
        <Container maxWidth='xl'>
          <Scraper />
        </Container>
      </main>
    </div>
  );
}

export default App;
