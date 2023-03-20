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

export const fetchRaceSlice = createSlice({
    name: 'fetchRace',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
});

export const {
} = fetchRaceSlice.actions;

export const selectRegisteredDates = (state: RootState) => state.fetchRace.test_flag;

export default fetchRaceSlice.reducer;
