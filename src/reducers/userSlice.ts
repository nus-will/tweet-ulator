import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
  username: string,
  isLogged: boolean
}

const initialState: UserState = {
  username: '',
  isLogged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.username ='';
      state.isLogged = false;
    },
  }
})

export const { login, logout } = userSlice.actions

export const selectUsername = (state: RootState) => state.user.username
export const isLogged = (state: RootState) => state.user.isLogged

export default userSlice.reducer