import React from 'react';
import { Scraper } from './features/scraper/Scraper';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { BedroomBaby } from '@mui/icons-material';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{flexGrow: 2}}>競馬スクレイパー</Typography>
          <BedroomBaby></BedroomBaby>
        </Toolbar>
      </AppBar>

      <main>
        <Container maxWidth='xl'>
          <Scraper />
          <h2>{process.env.REACT_APP_HASURA_API_KEY}</h2>
        </Container>
      </main>
    </div>
  );
}

export default App;
