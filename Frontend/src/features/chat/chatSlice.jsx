// src/store/slices/ChatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  sidebarOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { addMessage, toggleSidebar } = chatSlice.actions;
export default chatSlice.reducer;
