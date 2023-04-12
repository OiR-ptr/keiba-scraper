import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface SwitchState {
    mode: string
}

const initialState: SwitchState = {
    mode: 'empty'
};

export const switchSlice = createSlice({
    name: 'switch',
    initialState,
    reducers: {
        toWeather: (state) => {},
        toRaces: (state) => {
            state.mode = 'races'
        },
    },
    extraReducers: (builder) => {
    }
});

export const {
    toWeather,
    toRaces,
} = switchSlice.actions;

export const selectMode = (state: RootState) => state.switch.mode;

export default switchSlice.reducer;
