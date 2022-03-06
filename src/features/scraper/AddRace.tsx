import { Box, Button, Paper, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';

export function AddRace() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  const steps = ['dots', 'dep'];

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

      {/* ここにステップごとの入力内容を記載 */}
      {
        steps[activeStep] == 'dots' && (
          <>
            <div>aiueo</div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button sx={{ mr: 1 }}>Back</Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button>Next</Button>
            </Box>
          </>
        )
      }
      {
        steps[activeStep] == 'dep' && (
          <>
            <div>abcdefghijklmnopqrstuvwxyz</div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button sx={{ mr: 1 }}>Back</Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button>Next</Button>
            </Box>
          </>
        )
      }
    </Box>
  );
}