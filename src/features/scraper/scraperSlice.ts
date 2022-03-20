import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deleteRaceById, fetchRace, fetchRaceById, registerRace } from "./scraperAPI";

export type ScraperMenu = 'home' | 'open' | 'add';
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

export interface FetchRaceByIdResponse {
  data: {
    Races_by_pk: RaceCard,
  }
}

export interface RaceCard {
  name: string,
  weather: string,
  baba: string,
  course: string,
  Track: {
    name: string,
    comment: string,
    turf_comment: string,
  },
  Entries: [
    {
      waku: number,
      umaban: number,
      barei: string,
      handicap: number,
      weight: string,
      jockey: string,
      trainer: string,
      href: string,
      Horse: {
        name: string,
        sire: string,
        broodmare_sire: string,
        RaceResults: [
          {
            date: Date,
            raceName: string,
            course: string,
            weather: string,
            baba: string,
            track: string,
            waku: number,
            umaban: number,
            handicap: number,
            weight: string,
            jockey: string,
            finish: number,
            time: string,
            gap: string,
            halon: number,
            winner: string,
            passing: string,
            pace: string,
          }
        ],
      }
    }
  ],
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

export interface Opening {
  raceCard: RaceCard | null,
}

export interface ScraperState {
  menu: ScraperMenu,
  targetId: number,
  races: Race[],
  tracks: Track[],
  value: number,
  adding: Adding,
  api: ApiStatus,
  opening: Opening,
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
  opening: {
    raceCard: null,
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

export const openRace = createAsyncThunk(
  'scraper/openRace',
  async (raceId: number, thunkApi) => {
    console.warn('scraper/openRace');
    const state = thunkApi.getState() as RootState;
    if(state.scraper.opening.raceCard !== null) {
      return state.scraper.opening.raceCard;
    }

    const response = await fetchRaceById(raceId);
    const respJson = (await response.json()) as FetchRaceByIdResponse;
    return respJson.data.Races_by_pk;
  },
);

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    toHome: (state) => {
      state.menu = 'home';
      state.targetId = NaN;
      state.adding.raceJson = '';
      state.adding.horsesJson = [];
      state.opening.raceCard = null;
    },
    toOpen: (state, action: PayloadAction<number>) => {
      state.menu = 'open';
      state.targetId = action.payload;
    },
    toAdd: (state) => {
      state.menu = 'add';
      state.targetId = NaN;
      state.opening.raceCard = null;
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
      })
      .addCase(openRace.pending, (state) => {
        state.api = 'loading';
      })
      .addCase(openRace.fulfilled, (state, action) => {
        state.api = 'none';
        state.opening.raceCard = action.payload;
      });
  }
});

export const { 
  toHome, toOpen, toAdd, 
  updateRaceJson,
  addHorseJson,
} = scraperSlice.actions;

export const selectMenu = (state: RootState) => state.scraper.menu;
export const selectTargetId = (state: RootState) => state.scraper.targetId;
export const selectRaces = (state: RootState) => state.scraper.races;
export const selectAdding = (state: RootState) => state.scraper.adding;
export const selectOpening = (state: RootState) => state.scraper.opening;

export default scraperSlice.reducer;