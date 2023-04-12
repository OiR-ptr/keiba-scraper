import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TodayIcon from '@mui/icons-material/CalendarToday';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectHoldDate, selectRegisteredDates, selectSelectedHoldDate } from '../features/races/slice/RaceSlice';
import { fetchRegisteredDates } from '../features/races/slice/RaceSlice';
import { toRaces } from '../features/SwitchSlice';

export function AppDrawer() {
    const dispatch = useAppDispatch();
    const registeredDates = useAppSelector(selectRegisteredDates);
    const selectedHoldDate = useAppSelector(selectSelectedHoldDate);

    const [selectedIdx, setSelectedIdx] = useState(-1);

    useLayoutEffect(() => {
        dispatch(fetchRegisteredDates());
    }, []);

    useEffect(() => {
        if(0 <= selectedIdx) {
            const date = registeredDates[selectedIdx];
            dispatch(selectHoldDate(date));
            dispatch(toRaces());
        }
    }, [selectedIdx]);

    return (
        <Drawer variant='permanent' open={true}>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon><TodayIcon /></ListItemIcon>
                        <ListItemText>{selectedHoldDate}</ListItemText>
                    </ListItemButton>
                </ListItem>
                {registeredDates.map((date, idx) => {
                    return <ListItem key={idx}>
                        <ListItemButton onClick={_ => setSelectedIdx(idx)} selected={selectedIdx === idx}>
                            <ListItemIcon><TodayIcon/></ListItemIcon>
                            <ListItemText primary={date} />
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
        </Drawer>
    );
}