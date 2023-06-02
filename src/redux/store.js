// store.js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slices/testSlice";
import countRouteReducer from "./slices/routeSlices/routeSlice";
import messageReducer from "./slices/routeSlices/messageSlice";
export const store = configureStore({
  reducer: {
    test: testReducer,
    routeCount: countRouteReducer,
    messages: messageReducer,
  },
});

export default store;
