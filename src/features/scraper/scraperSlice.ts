import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchRace } from "./scraperAPI";

export type ScraperMenu = 'home' | 'edit' | 'delete' | 'add';
export type ApiStatus = 'none' | 'loading';

export interface FetchRaceReponse {
  data: {
    Races: Race[],
  },
}

export interface Track {
  id: number,
  name: string,
  comment: string,
  turf_comment: string,
}

export interface Race {
  id: number,
  name: string,
  course: string,
  weather: string,
  baba: string,
  Track: Track,
}

export interface Adding {
  raceJson: string,
  horsesJson: string[],
}

export interface ScraperState {
  menu: ScraperMenu,
  targetId: number,
  races: Race[],
  value: number,
  adding: Adding,
  api: ApiStatus,
}

export interface EntryHorse {
  Waku_Txt_C: string,
  Umaban_Txt_C: string,
  HorseInfo: string,
  Barei_Txt_C: string,
  Txt_C: string,
  Jockey: string,
  Weight: string,
  href: string,
}

export interface RaceJson {
  raceName: string,
  raceTrack: string,
  course: string,
  horses: EntryHorse[],
}

const initialState: ScraperState = {
  menu: 'home',
  api: 'none',
  targetId: NaN,
  races: [],
  value: 0,
  adding: {
    raceJson: '',
    horsesJson: [],
  },
}

export const fetchCurrentRaces = createAsyncThunk(
  'scraper/fetchRace',
  async () => {
    const response = await fetchRace();
    const respJson = (await response.json()) as FetchRaceReponse;
    return respJson.data.Races;
  }
);

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    toHome: (state) => {
      state.menu = 'home';
      state.targetId = NaN;
    },
    toEdit: (state, action: PayloadAction<number>) => {
      state.menu = 'edit';
      state.targetId = action.payload;
    },
    toDelete: (state, action: PayloadAction<number>) => {
      state.menu = 'delete';
      state.targetId = action.payload;
    },
    toAdd: (state) => {
      state.menu = 'add';
      state.targetId = NaN;
    },
    updateRaceJson: (state, action: PayloadAction<string>) => {
      state.adding.raceJson = action.payload;
    },
    addHorseJson: (state, action: PayloadAction<string>) => {
      state.adding.horsesJson = [...state.adding.horsesJson, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentRaces.pending, (state) => {
        state.api = 'loading';
      })
      .addCase(fetchCurrentRaces.fulfilled, (state, action) => {
        state.api = 'none';
        state.races = action.payload;
        console.log(state.races);
      });
  }
});

export const { 
  toHome, toEdit, toDelete, toAdd, 
  updateRaceJson,
  addHorseJson,
} = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectTargetId = (state: RootState) => state.scraper.targetId;
export const selectRaces = (state: RootState) => state.scraper.races;
export const selectAdding = (state: RootState) => state.scraper.adding;

export default scraperSlice.reducer;