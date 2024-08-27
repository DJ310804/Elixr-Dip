import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Load saved theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', action.payload); // Apply theme
      localStorage.setItem('theme', action.payload); // Save theme to localStorage
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
