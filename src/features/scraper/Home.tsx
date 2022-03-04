import React from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRaces, switchMode } from './scraperSlice';

export function Home() {
  const races = useAppSelector(selectRaces);
  const dispatch = useAppDispatch();

  function toEdit(id: number) {
    console.log(`to edit: ${id}`);
    dispatch(switchMode('edit'));
  }

  function toDelete(id: number) {
    console.log(`to delete: ${id}`);
    dispatch(switchMode('delete'));
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
                  <IconButton onClick={e => toEdit(row.id)}><EditIcon /></IconButton>
                  <IconButton onClick={e => toDelete(row.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}