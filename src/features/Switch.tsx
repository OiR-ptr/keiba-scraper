import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectMode } from './SwitchSlice';
import { Races } from '../pages/Races';
import { Scraper } from './scraper/Scraper';

export function Switch() {
    const mode = useAppSelector(selectMode);
    const [switchComponent, setSwitchComponent] = useState(<></>);

    useEffect(() => {
        switch(mode) {
            case 'races':
                setSwitchComponent(<Races />);
                break;

            default:
                setSwitchComponent(<Scraper />);
                break;
        }
    }, [mode]);

    return (
        <Container maxWidth='lg'>
            {switchComponent}
        </Container>
    );
}