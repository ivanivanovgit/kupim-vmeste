// store.js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slices/testSlice";
import countRouteReducer from "./slices/routeSlices/routeSlice";
import errorMessageReducer from "./slices/routeSlices/errorMessageSlice";
export const store = configureStore({
  reducer: {
    test: testReducer,
    routeCount: countRouteReducer,
    errorMessage: errorMessageReducer,
  },
});

export default store;
