import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import User from '../../model/user';

const initialState = {
  user: undefined,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: any, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    cleanupUser(state: any) {
      delete state.user;
      state.user = undefined;
    },
  },
});

export const {setUser, cleanupUser} = user?.actions;
export default user.reducer;
export const selectUser = (state: any) => state.user.user;

