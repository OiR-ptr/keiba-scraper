import React from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRaces, toDelete, toEdit } from './scraperSlice';

export function Home() {
  const races = useAppSelector(selectRaces);
  const dispatch = useAppDispatch();

  function switchToEdit(id: number) {
    dispatch(toEdit(id));
  }

  function switchToDelete(id: number) {
    dispatch(toDelete(id));
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>track</TableCell>
            <TableCell>name</TableCell>
            <TableCell>course</TableCell>
            <TableCell>weather</TableCell>
            <TableCell>baba</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Tooltip title={row.track.turf_comment}>
                    <Button>{row.track.name}</Button>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.weather}</TableCell>
                <TableCell>{row.baba}</TableCell>
                <TableCell>
                  <IconButton onClick={e => switchToEdit(row.id)}><EditIcon /></IconButton>
                  <IconButton onClick={e => switchToDelete(row.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}