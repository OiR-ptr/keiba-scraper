import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export type ScraperMenu = 'home' | 'edit' | 'delete' | 'add';

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
  targetId: number,
  races: Race[],
  value: number,
}

const initialState: ScraperState = {
  menu: 'home',
  targetId: NaN,
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
  }, { 
    id: 2,
    baba: "馬場:良",
    course: "芝2000m (右)",
    name: "弥生賞ディープインパクト記念",
    weather: "天候:晴",
    track: {
      id: 2,
      name: "中山",
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
    }
  },
});

export const { toHome, toEdit, toDelete, toAdd } = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectTargetId = (state: RootState) => state.scraper.targetId;
export const selectRaces = (state: RootState) => state.scraper.races;

export default scraperSlice.reducer;