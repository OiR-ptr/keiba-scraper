import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { OpenEntries } from './OpenEntries';
import { openRace, selectTargetId, toHome } from './scraperSlice';

type OpenTab = 'entries' | 'same' | 'by_condition' | 'heavy' | 'discount';

export function OpenRace() {
  const targetRace = useAppSelector(selectTargetId);
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<OpenTab>('entries');

  useEffect(() => {
    switch(value) {
      case 'entries':
        dispatch(openRace(targetRace));
        break;
    }

    
  }, [value]);

  const handleTabChange = (_: any, newValue: OpenTab) => {
    setValue(newValue);
  }

  const handleHome = () => {
    dispatch(toHome());
  }

  return (
    <>
      <Button sx={{ mr: 1 }} onClick={e => handleHome()}>Home</Button>    
      <TabContext value={value}>
        <TabList sx={{ borderBottom: 1, borderColor: 'divider' }} onChange={handleTabChange}>
          <Tab value='entries' label='出馬表' />
          <Tab value='same' label='同条件' />
          <Tab value='by_condition' label='条件別' />
          <Tab value='heavy' label='不良馬場' />
          <Tab value='discount' label='割引' />
        </TabList>

        <TabPanel value='entries'>
          <OpenEntries />
        </TabPanel>

        <TabPanel value='same'>
          Same
        </TabPanel>

        <TabPanel value='by_condition'>
          By_condition
        </TabPanel>

        <TabPanel value='heavy'>
          Heavy
        </TabPanel>

        <TabPanel value='discount'>
          Discount
        </TabPanel>
      </TabContext>
    </>
  );
}