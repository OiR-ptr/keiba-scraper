import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

type ScraperMenu = 'home' | 'edit' | 'delete' | 'add';

interface Track {
  id: number,
  name: string,
  comment: string,
  turf_comment: string,
}

interface Race {
  id: number,
  name: string,
  course: string,
  weather: string,
  baba: string,
  track: Track,
}

interface ScraperState {
  menu: ScraperMenu,
  races: Race[],
  value: number,
}

const initialState: ScraperState = {
  menu: 'home',
  races: [{ 
    id: 0,
    baba: "",
    course: "芝1600m (右 外)",
    name: "チューリップ賞",
    weather: "",
    track: {
      id: 1,
      name: "阪神",
      comment: "",
      turf_comment: "芝えぐれてるって～w",
    }
  }, { 
    id: 1,
    baba: "",
    course: "芝1200m (右 外)",
    name: "オーシャンS",
    weather: "",
    track: {
      id: 1,
      name: "阪神",
      comment: "",
      turf_comment: "芝荒れてるかもw",
    }
  }],
  value: 0,
}

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<ScraperMenu>) => {
      state.menu = action.payload;
    },
  },
});

export const { switchMode } = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectRaces = (state: RootState) => state.scraper.races;

export default scraperSlice.reducer;