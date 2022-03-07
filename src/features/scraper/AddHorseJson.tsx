import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RaceJson, selectAdding } from './scraperSlice';

export function AddHorseJson() {
  const adding = useAppSelector(selectAdding);
  const { raceJson, horsesJson } = adding;
  const dispatch = useAppDispatch();

  const [raceObject, setRaceObject] = useState<RaceJson>();

  useEffect(() => {
    try {
      const obj = JSON.parse(raceJson) as RaceJson;
      setRaceObject(obj);
    } catch {
      console.error('Wow, cant convert race table.');
    }
  }, [raceJson]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{raceObject?.raceName}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>枠番</TableCell>
              <TableCell>馬番</TableCell>
              <TableCell>馬名</TableCell>
              <TableCell>馬齢</TableCell>
              <TableCell>斤量</TableCell>
              <TableCell>騎手</TableCell>
              <TableCell>体重</TableCell>
              <TableCell>リンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {raceObject?.horses.map(horse => {
              return (
                <TableRow key={horse.Waku_Txt_C}>
                  <TableCell>{horse.Waku_Txt_C}</TableCell>
                  <TableCell>{horse.Umaban_Txt_C}</TableCell>
                  <TableCell>{horse.HorseInfo}</TableCell>
                  <TableCell>{horse.Barei_Txt_C}</TableCell>
                  <TableCell>{horse.Txt_C}</TableCell>
                  <TableCell>{horse.Jockey}</TableCell>
                  <TableCell>{horse.Weight}</TableCell>
                  <TableCell>{horse.href}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}