import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import shutubaSnippet from '../../_media/list.snippet';
import profileSnippet from '../../_media/profile.snippet';
import addSnippetGif from '../../_media/registerSnippet.gif';

export function PrepareSnippet() {
  const [list, setList] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    fetch(shutubaSnippet).then(d => d.text()).then(tex => {
      setList(tex);
    });

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
        <img src={addSnippetGif} alt="sorry, please add snippet your computer." />
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