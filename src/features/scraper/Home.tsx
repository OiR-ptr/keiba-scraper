import React from 'react';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRaces, toAdd, toDelete, toEdit } from './scraperSlice';

export function Home() {
  const races = useAppSelector(selectRaces);
  const dispatch = useAppDispatch();

  function switchToEdit(id: number) {
    dispatch(toEdit(id));
  }

  function switchToDelete(id: number) {
    dispatch(toDelete(id));
  }

  function switchToAdd() {
    dispatch(toAdd());
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>開催</TableCell>
              <TableCell>レース名</TableCell>
              <TableCell>条件</TableCell>
              <TableCell>天候</TableCell>
              <TableCell>馬場</TableCell>
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
                    <Tooltip title={`${row.name}を編集`}>
                      <IconButton onClick={e => switchToEdit(row.id)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={`${row.name}を削除`}>
                      <IconButton onClick={e => switchToDelete(row.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button variant="contained" color='error' 
          startIcon={<AddIcon />}
          onClick={e => switchToAdd()}>
          レースを登録
        </Button>
      </Box>
    </>
  );
}