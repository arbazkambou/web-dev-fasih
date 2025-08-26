import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    storeUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { storeUsername } = userSlice.actions;

export const getUsername = (state) => state.user.username;

export const userReducer = userSlice.reducer;
