import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

export function PrepareSnippet() {
  const [list, setList] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    const shutubaSnippet = '';
    fetch(shutubaSnippet).then(d => d.text()).then(tex => {
      setList(tex);
    });

    const profileSnippet = '';
    fetch(profileSnippet).then(d => d.text()).then(tex => {
      setProfile(tex);
    });
  }, [])

  function clipSnippet(snippet: string) {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <img src={'none'} alt="sorry, please add snippet your computer." />
      </Box>

      <LoadingButton 
        loading={list === ''} 
        variant='outlined'
        loadingIndicator='Loading...'
        onClick={e => clipSnippet(list)}>
          出馬表取得スニペット
      </LoadingButton>

      <LoadingButton 
        loading={profile === ''} 
        variant='outlined'
        loadingIndicator='Loading...'
        onClick={e => clipSnippet(profile)}>
          競走馬データ取得スニペット
      </LoadingButton>
    </Box>
  );
}