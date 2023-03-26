import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { fetchRace, fetchRegisteredHolds } from "../api/FetchRaceAPI";

interface FetchRegisteredDateResponse {
    data: {
        Hold: [
            {
                kaisai_date: string,
            }
        ],
    }
}

export const fetchRegisteredDates = createAsyncThunk(
    '',
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
    test_flag: Boolean,
};

const initialState: FetchRaceState = {
    test_flag: false,
};

export const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
});

export const {
} = raceSlice.actions;

export const selectRegisteredDates = (state: RootState) => state.raceSlice.test_flag;

export default raceSlice.reducer;
