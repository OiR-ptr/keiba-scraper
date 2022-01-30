import React from 'react';
import { Button, TextField } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function Scraper() {
  const [raceUrl, setRaceUrl] = React.useState('');
  const dispatch = useAppDispatch();

  const fetchFromNetKeiba = (url : string) => {
    console.log(url);
  };

  return (
    <div>
      <TextField fullWidth id="race_id" label="race_id" variant="outlined" value={raceUrl} 
        onChange={(e) => setRaceUrl(e.target.value)}
        placeholder='https://race.netkeiba.com/race/shutuba.html?race_id=XXXXXX' />
      <Button variant="outlined" endIcon={<GetAppIcon />} 
        onClick={(e) => fetchFromNetKeiba(raceUrl)}>Fetch</Button>
    </div>
  );
}