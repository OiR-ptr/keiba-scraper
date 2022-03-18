import React from 'react';
import { Container } from '@mui/material';
import { Home } from './Home';
import { useAppSelector } from '../../app/hooks';
import { selectMenu, selectTargetId } from './scraperSlice';
import { AddRace } from './AddRace';

export function Scraper() {
  const menu = useAppSelector(selectMenu);
  const target = useAppSelector(selectTargetId);

  function SelectDisplayComponent() {
    switch(menu) {
      case 'home':    return <Home />;
      case 'edit':    return <div>EDIT!!! {target}</div>;
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