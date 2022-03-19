import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCurrentRaces, selectRaces, toAdd, toOpen } from './scraperSlice';
import { DeleteConfirm } from './DeleteConfirm';

export function Home() {
  const races = useAppSelector(selectRaces);
  const dispatch = useAppDispatch();

  const [removeIt, setRemoveIt] = useState({ id: -1, name: '' });

  useEffect(() => {
    dispatch(fetchCurrentRaces());
  }, []);

  function handleOpen(id: number) {
    dispatch(toOpen(id));
  }

  function handleDelete(id: number, name: string) {
    setRemoveIt({ ...removeIt, id, name });
  }

  function switchToAdd() {
    dispatch(toAdd());
  }

  function handleDeleteCancel() {
    setRemoveIt({ ...removeIt, id: -1, name: '' });
  }

  function handleDeleteOk() {
    setRemoveIt({ ...removeIt, id: -1, name: '' });
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
                    <Tooltip title={row.Track?.turf_comment ?? '状態不明'}>
                      <Button>{row.Track.name}</Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{row.weather}</TableCell>
                  <TableCell>{row.baba}</TableCell>
                  <TableCell>
                    <Tooltip title={`${row.name}を確認`}>
                      <IconButton onClick={e => handleOpen(row.id)}><VisibilityIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={`${row.name}を削除`}>
                      <IconButton onClick={e => handleDelete(row.id, row.name)}><DeleteIcon /></IconButton>
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
      <DeleteConfirm 
        open={removeIt.id !== -1} 
        target={removeIt} 
        onCancel={handleDeleteCancel} 
        onComplete={handleDeleteOk} />
    </>
  );
}