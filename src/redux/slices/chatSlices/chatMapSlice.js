// chatMapSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputText: "",
  inputGroupText: "",
  address: "",
  createMarker: 0,
  selectedTheme: "",
  isMarkerPlaced: false,
  searchButtonClick: null,
  searchInput: "",
};

export const chatMapSlice = createSlice({
  name: "chatMap",
  initialState,
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setInputGroupText: (state, action) => {
      state.inputGroupText = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    incrementCountAddMarker: (state) => {
      state.createMarker += 1;
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
    setIsMarkerPlaced: (state, action) => {
      state.isMarkerPlaced = action.payload;
    },
    setSearchButtonClick: (state, action) => {
      state.searchButtonClick = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const {
  setInputText,
  setInputGroupText,
  setAddress,
  incrementCountAddMarker,
  setSelectedTheme,
  setIsMarkerPlaced,
  setSearchButtonClick,
  setSearchInput,
} = chatMapSlice.actions;

export default chatMapSlice.reducer;
