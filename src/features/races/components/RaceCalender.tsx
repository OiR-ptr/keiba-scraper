import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRegisteredDates } from '../slice/FetchRaceSlice';

export function RaceCalender() {
    const test_flag = useAppSelector(selectRegisteredDates);
    const dispatch = useAppDispatch();
    const [selectedDate, onChange] = useState(new Date());
    
    useEffect(() => {
        console.warn(`APP SELECTOR TEST_FLAG: ${test_flag}`);
    }, [test_flag]);

    return (
        <div>
            <Calendar onChange={onChange} value={selectedDate} />
        </div>
    );
}