import React from 'react';
import { Container } from '@mui/material';
import { Home } from './Home';
import { useAppSelector } from '../../app/hooks';
import { selectMenu } from './scraperSlice';
import { AddRace } from './AddRace';
import { OpenRace } from './OpenRace';

export function Scraper() {
  const menu = useAppSelector(selectMenu);

  function SelectDisplayComponent() {
    switch(menu) {
      case 'home':    return <Home />;
      case 'open':    return <OpenRace />;
      case 'add':     return <AddRace />;
    }
    return <div>ERROR!!!!</div>;
  }

  return (
    <Container maxWidth="lg">
      {SelectDisplayComponent()}
    </Container>
  );
}