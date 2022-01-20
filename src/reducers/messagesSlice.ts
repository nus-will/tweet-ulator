import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
  data: any
}

const initialState: MessageState = {
  data: []
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    }
  }
})

export const { setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer