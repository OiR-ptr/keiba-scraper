import React from 'react';
import { Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function Scraper() {
  const dispatch = useAppDispatch();

  return (
    <Typography>This is body</Typography>
  );
}