import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import switchReducer from '../features/SwitchSlice';
import scraperReducer from '../features/scraper/scraperSlice';
import RaceReducer from '../features/races/slice/RaceSlice';


export const store = configureStore({
  reducer: {
    switch: switchReducer,
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
