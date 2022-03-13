import { CheckCircle } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Badge, Box, Button, IconButton, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntryHorse, RaceJson, selectAdding, addHorseJson } from './scraperSlice';
import runSnippet2Gif from '../../_media/runSnippet2.gif';

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
  const [editingIndex, setEditingIndex] = useState(-1);
  const [inputJson, setInputJson] = useState('');
  const [hasErrorJson, setHasErrorJson] = useState(true);

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

  useEffect(() => {
    try {
      JSON.parse(inputJson);
      props.onOk?.();
      setHasErrorJson(false);
    } catch {
      props.onError?.();
      setHasErrorJson(true);
    }
  }, [inputJson]);

  function handleAddHorseJson(index: number) {
    setEditingIndex(index);
  }

  function handleHorseJsonCancel() {
    setEditingIndex(-1);
    setInputJson('');
  }

  function saveTemporaryInput(inputValue: string) {
    setInputJson(inputValue);
  }

  function handleHorseJsonOk() {
    try {
      setHorsesRegister(horsesRegister.map((value, idx) => {
        if(idx === editingIndex) return 'ok';
        return value;
      }));
      dispatch(addHorseJson(inputJson));
      setEditingIndex(-1);
      setInputJson('');
    } catch {
      console.error('OH MY FUCKING SHIT');
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{raceObject?.raceName} {raceObject?.raceTrack} {raceObject?.course}</Typography>
      <img src={runSnippet2Gif} alt='sorry, please run profile snippet and paste to each horses' />

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
                    <IconButton 
                      color='error' 
                      disabled={horsesRegister[index] === 'ok'}
                      onClick={e => handleAddHorseJson(index)}>
                        <AddCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editingIndex >= 0}>
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600,
        bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,}}>
          <TextField
            error={hasErrorJson}
            label="出馬表JSON"
            placeholder="GIFに従って出馬表JSON結果をペースト"
            multiline
            onChange={e => saveTemporaryInput(e.target.value)}
            minRows={10}
            maxRows={30}
            fullWidth
            variant="filled"
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button onClick={e => handleHorseJsonCancel()}>Cancel</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={hasErrorJson} onClick={e => handleHorseJsonOk()}>OK</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}