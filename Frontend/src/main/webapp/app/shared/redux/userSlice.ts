import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../layout/header/header-components';

const initialState: IUser | Record<string, unknown> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDataUser(state, action: PayloadAction<IUser | Record<string, unknown>>) {
      return action.payload;
    },
    logoutUser(state) {
      return {};
    },
  },
});

export const { setDataUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
