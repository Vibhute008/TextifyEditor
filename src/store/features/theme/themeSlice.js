import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
  mode: 'light',
  backgroundColor: 'white',
  color: '#1b1f22',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setLightTheme(state, action) {
      state.mode = 'light';
      state.backgroundColor = 'white';
      state.color = '#1b1f22';
      document.body.style.backgroundColor = state.backgroundColor;
    },
    setDarkTheme(state, action) {
      state.mode = 'dark';
      state.backgroundColor = '#1b1f22';
      state.color = 'white';
      document.body.style.backgroundColor = state.backgroundColor;
    },
  },
});

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;
