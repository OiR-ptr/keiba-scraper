import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toHome } from './scraperSlice';

export function AddRace() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  const steps = ['RACE', 'HORSES'];

  function backToHome() {
    setActiveStep(0);
    dispatch(toHome());
  }

  function handleBack() {
    const backTo = activeStep - 1;
    if(backTo < 0) {
      backToHome();
    } else {
      setActiveStep(backTo);
    }
  }

  function handleNext() {
    const nextTo = activeStep + 1;
    if(steps.length <= nextTo) {
      console.error('STEP COMPLETED!!!');
    } else {
      setActiveStep(nextTo);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {
        steps[activeStep] === 'RACE' && (
          <>
            <div>aiueo</div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button sx={{ mr: 1 }} onClick={e => handleBack()}>Cancel</Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={e => handleNext()}>Next</Button>
            </Box>
          </>
        )
      }
      {
        steps[activeStep] === 'HORSES' && (
          <>
            <div>abcdefghijklmnopqrstuvwxyz</div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button onClick={e => handleBack()} sx={{ mr: 1 }}>Back</Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={e => handleNext()}>Finish</Button>
            </Box>
          </>
        )
      }
    </Box>
  );
}