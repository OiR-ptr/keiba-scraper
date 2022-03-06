import { Box, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import cat from '../../_media/catgif.gif';

type Props = {
  onError?: VoidFunction,
  onOk?: VoidFunction,
};

export function AddRaceJson(props: Props) {
  const [shutubaJson, setShutubaJson] = useState('{}');

  const hasJsonError = useMemo(() => {
    try {
      JSON.parse(shutubaJson);
      props.onOk?.();
      return false;
    } catch {
      props.onError?.();
      return true;
    }
  }, [shutubaJson]);
  
  return (
    <Box sx={{ width: '100%' }}>
      <img src={cat} />
      <TextField
          error={hasJsonError}
          onChange={e => setShutubaJson(e.target.value)}
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