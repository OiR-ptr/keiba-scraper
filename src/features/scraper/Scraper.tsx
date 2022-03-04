import React from 'react';
import { Container } from '@mui/material';
import { Home } from './Home';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMenu } from './scraperSlice';

export function Scraper() {
  const menu = useAppSelector(selectMenu);
  const dispatch = useAppDispatch();

  function SelectDisplayComponent() {
    switch(menu) {
      case 'home':    return <Home />;
      case 'edit':    return <div>EDIT!!!</div>;
      case 'delete':  return <div>DELETE!!!</div>
      case 'add':     return <div>ADDDDD</div>;
    }
    return <div>ERROR!!!!</div>;
  }

  return (
    <Container maxWidth="lg">
      {SelectDisplayComponent()}
    </Container>
  );
}