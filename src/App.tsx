import React from 'react';
import { Container } from '@mui/material';
import { Scraper } from './features/scraper/Scraper';

function App() {
  return (
    <div>
      <main>
        <Container maxWidth='xl'>
          <Scraper />
          {/* <h2>{process.env.REACT_APP_HASURA_API_KEY}</h2> */}
        </Container>
      </main>
    </div>
  );
}

export default App;
