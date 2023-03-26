import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import scraperReducer from '../features/scraper/scraperSlice';
import RaceReducer from '../features/races/slice/RaceSlice';

export const store = configureStore({
  reducer: {
    scraper: scraperReducer,
    race: RaceReducer,
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
