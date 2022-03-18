import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deleteRaceById, fetchRace, registerRace } from "./scraperAPI";

export type ScraperMenu = 'home' | 'edit' | 'add';
export type ApiStatus = 'none' | 'loading';

export interface FetchRaceReponse {
  data: {
    Races: Race[],
    Tracks: Track[],
  },
}

export interface RegisterRaceResponse {
  data: {
    id: number,
  }
}

export interface DeleteRaceByIdResponse {
  data: {
    delete_RaceResult: {
      affected_rows: number,
    },
    delete_Horses: {
      affected_rows: number,
    },
    delete_Entries: {
      affected_rows: number,
    },
    delete_Races: {
      affected_rows: number,
      returning: [
        {
          id: number,
        }
      ]
    }
  }
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
  tracks: Track[],
  value: number,
  adding: Adding,
  api: ApiStatus,
}

export interface EntryHorse {
  Waku_Txt_C: string,
  Umaban_Txt_C: string,
  CheckMark_Horse_Select: string,
  HorseInfo: string,
  Barei_Txt_C: string,
  Txt_C: string,
  Jockey: string,
  Trainer: string,
  Weight: string,
  href: string,
}

export interface HorseProfile {
  name: string,
  sire: string,
  broodmare_sire: string,
  results: RaceResult[],
}

export interface RaceResult {
  date: Date,
  track: string,
  weather: string,
  round: number,
  raceName: string,
  heads: number,
  waku: number,
  umaban: number,
  popular: number,
  finish: number,
  jockey: string,
  handicap: number,
  course: string,
  baba: string,
  time: string,
  gap: string,
  passing: string,
  pace: string,
  halon: number,
  weight: string,
  winner: string,
}

export interface RaceJson {
  raceName: string,
  raceTrack: string,
  course: string,
  weather: string,
  baba: string,
  horses: EntryHorse[],
}

const initialState: ScraperState = {
  menu: 'home',
  api: 'none',
  targetId: NaN,
  races: [],
  tracks: [],
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
    return respJson.data;
  }
);

export const registerRaces = createAsyncThunk(
  'scraper/registerRace',
  async (adding: Adding, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const response = await registerRace(adding, state.scraper.tracks);
    const respJson = (await response.json()) as RegisterRaceResponse;
    return respJson.data;
  }
);

export const deleteRace = createAsyncThunk(
  'scraper/deleteRace',
  async (raceId: number) => {
    const response = await deleteRaceById(raceId);
    const respJson = (await response.json()) as DeleteRaceByIdResponse;
    return respJson.data;
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
        state.races = action.payload.Races;
        state.tracks = action.payload.Tracks;
      })
      .addCase(registerRaces.pending, (state) => {
        state.api = 'loading';
      })
      .addCase(registerRaces.fulfilled, (state, action) => {
        state.api = 'none';
        state.menu = 'home';
      })
      .addCase(deleteRace.pending, (state) => {
        state.api = 'loading';
      })
      .addCase(deleteRace.fulfilled, (state, action) => {
        const removed = action.payload.delete_Races.returning;
        state.api = 'none';
        state.races = state.races.filter(race => {
          return removed.find(rm => rm.id !== race.id);
        });
      });
  }
});

export const { 
  toHome, toEdit, toAdd, 
  updateRaceJson,
  addHorseJson,
} = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectTargetId = (state: RootState) => state.scraper.targetId;
export const selectRaces = (state: RootState) => state.scraper.races;
export const selectAdding = (state: RootState) => state.scraper.adding;

export default scraperSlice.reducer;