import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTargetId } from './scraperSlice';

export function EditRace() {
  const targetRace = useAppSelector(selectTargetId);
  const dispatch = useAppDispatch();

  return (
    <div></div>
  );
}