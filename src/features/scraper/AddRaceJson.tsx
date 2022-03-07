import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import runSnippetGif from '../../_media/runSnippet.gif';
import { selectAdding, updateRaceJson } from './scraperSlice';

type Props = {
  onError?: VoidFunction,
  onOk?: VoidFunction,
};

export function AddRaceJson(props: Props) {
  const adding = useAppSelector(selectAdding);
  const { raceJson, horsesJson } = adding;
  const dispatch = useAppDispatch();

  const [hasJsonError, setHasJsonError] = useState(false);

  useEffect(() => {
    try {
      JSON.parse(raceJson);
      props.onOk?.();
      setHasJsonError(false);
    } catch {
      props.onError?.();
      setHasJsonError(true);
    }
  }, [raceJson]);
  
  return (
    <Box sx={{ width: '100%' }}>
      <img src={runSnippetGif} alt='sorry, please run list snippet and paste this page' />
      <TextField
          error={hasJsonError}
          defaultValue={raceJson}
          onChange={e => dispatch(updateRaceJson(e.target.value))}
          label="出馬表JSON"
          placeholder="GIFに従って出馬表JSON結果をペースト"
          multiline
          minRows={10}
          maxRows={30}
          fullWidth
          variant="filled"
        />
    </Box>
  );
}