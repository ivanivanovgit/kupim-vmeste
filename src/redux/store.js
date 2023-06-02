// store.js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slices/testSlice";
import countRouteReducer from "./slices/routeSlices/routeSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
    routeCount: countRouteReducer,
  },
});

export default store;
