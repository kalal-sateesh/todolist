/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import DataReducer from './DataSlice';

export const store = configureStore({
  reducer: {
    Data: DataReducer,
  },
});
