import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import scraperReducer from '../features/scraper/scraperSlice';
import fetchRaceReducer from '../features/races/slice/FetchRaceSlice';

export const store = configureStore({
  reducer: {
    scraper: scraperReducer,
    fetchRace: fetchRaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
