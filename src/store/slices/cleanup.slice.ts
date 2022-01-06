import { createSlice } from '@reduxjs/toolkit';

export interface State {}
const initialState: State = {
  //no state needed
};

export const cleanUpSlice = createSlice({
  name: 'cleanup',
  initialState,
  reducers: {
    //An action to clear cache
    cleanUp: (state) => {
      state = {};
    },
  },
});

export const { cleanUp } = cleanUpSlice.actions;

export default cleanUpSlice.reducer;
