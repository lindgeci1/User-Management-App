// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../store/usersSlice'; // <-- Correct path to your slice

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
