import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FetchRegisteredDateResponse, fetchRace, fetchRegisteredHolds } from "../api/FetchRaceAPI";

export const fetchRegisteredDates = createAsyncThunk(
    'race/fetchRegisteredDates',
    async () => {
        const response = await fetchRegisteredHolds();
        const respJson = (await response.json()) as FetchRegisteredDateResponse;
        return respJson;
    }
);

export const fetchRaces = createAsyncThunk(
    '',
    async () => {
        const response = await fetchRace();
        const respJson = (await response.json());
        return 0;
    }
);

export interface FetchRaceState {
    registeredDates: string[],
    minDate: string,
    maxDate: string,
    selectedHoldDate: string,
};

const initialState: FetchRaceState = {
    registeredDates: [],
    minDate: '',
    maxDate: '',
    selectedHoldDate: '',
};

export const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
        selectHoldDate: (state, action: PayloadAction<string>) => {
            state.selectedHoldDate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisteredDates.fulfilled, (state, action) => {
                state.registeredDates = action.payload.data.Hold.map(hold => {
                    return hold.kaisai_date;
                });
                const len = state.registeredDates.length;
                if(0 < len) {
                    state.minDate = state.registeredDates[0];
                    state.maxDate = state.registeredDates[len - 1];
                }
            })
    }
});

export const {
    selectHoldDate
} = raceSlice.actions;

export const selectRegisteredDates = (state: RootState) => state.race.registeredDates;
export const selectSelectedHoldDate = (state: RootState) => state.race.selectedHoldDate;

export default raceSlice.reducer;
