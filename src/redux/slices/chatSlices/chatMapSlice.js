// chatMapSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputText: "",
  inputGroupText: "",
  address: "",
  createMarker: 0,
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
  },
});

export const {
  setInputText,
  setInputGroupText,
  setAddress,
  incrementCountAddMarker,
} = chatMapSlice.actions;

export default chatMapSlice.reducer;
