import { CheckCircle } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Badge, Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntryHorse, RaceJson, selectAdding } from './scraperSlice';

type Props = {
  onError?: VoidFunction,
  onOk?: VoidFunction,
};

type RegisterCheck = 'none' | 'ok' | 'error';

export function AddHorseJson(props: Props) {
  const adding = useAppSelector(selectAdding);
  const { raceJson, horsesJson } = adding;
  const dispatch = useAppDispatch();

  const [horsesRegister, setHorsesRegister] = useState<RegisterCheck[]>([]);
  const [raceObject, setRaceObject] = useState<RaceJson>();

  useEffect(() => {
    try {
      const obj = JSON.parse(raceJson) as RaceJson;
      setHorsesRegister(obj.horses?.map(v => {
        return 'none';
      }) ?? []);
      setRaceObject(obj);
    } catch {
      console.error('Wow, cant convert race table.');
    }
  }, [raceJson]);

  function handleAddHorseJson(index: number) {
    console.error(`what the heck!? ${index}`);
    setHorsesRegister(horsesRegister.map((value, idx) => {
      if(idx === index) return 'error';
      return value;
    }));
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{raceObject?.raceName} {raceObject?.raceTrack} {raceObject?.course}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>枠番</TableCell>
              <TableCell>馬番</TableCell>
              <TableCell>馬名</TableCell>
              <TableCell>馬齢</TableCell>
              <TableCell>斤量</TableCell>
              <TableCell>騎手</TableCell>
              <TableCell>体重</TableCell>
              <TableCell>登録</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {raceObject?.horses?.map((horse: EntryHorse, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Badge>
                      {horsesRegister[index] === 'error' ? <ErrorIcon /> : 
                      horsesRegister[index] === 'ok' ? <CheckCircle /> : null}
                    </Badge>
                  </TableCell>
                  <TableCell>{horse.Waku_Txt_C}</TableCell>
                  <TableCell>{horse.Umaban_Txt_C}</TableCell>
                  <TableCell>
                    <Link href={horse.href} target='_blank' rel='noopener noreferrer'>
                      {horse.HorseInfo}
                    </Link>
                  </TableCell>
                  <TableCell>{horse.Barei_Txt_C}</TableCell>
                  <TableCell>{horse.Txt_C}</TableCell>
                  <TableCell>{horse.Jockey}</TableCell>
                  <TableCell>{horse.Weight}</TableCell>
                  <TableCell>
                    <IconButton color='error' onClick={e => handleAddHorseJson(index)}><AddCircleIcon /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}