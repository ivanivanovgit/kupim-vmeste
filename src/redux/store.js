// store.js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slices/testSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export default store;
