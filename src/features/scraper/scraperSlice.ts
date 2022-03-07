import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export type ScraperMenu = 'home' | 'edit' | 'delete' | 'add';

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
  track: Track,
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
  adding: {
    raceJson: '',
    horsesJson: [],
  },
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
    },
    updateRaceJson: (state, action: PayloadAction<string>) => {
      state.adding.raceJson = action.payload;
    }
  },
});

export const { toHome, toEdit, toDelete, toAdd, updateRaceJson } = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectTargetId = (state: RootState) => state.scraper.targetId;
export const selectRaces = (state: RootState) => state.scraper.races;
export const selectAdding = (state: RootState) => state.scraper.adding;

export default scraperSlice.reducer;