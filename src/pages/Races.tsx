import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedHoldDate } from '../features/races/slice/RaceSlice';

export function Races() {
    const dispatch = useAppDispatch();
    const selectedHoldDate = useAppSelector(selectSelectedHoldDate);

    useEffect(() => {
    }, [selectedHoldDate]);

    return (
        <div>
            show races
        </div>
    );
}
