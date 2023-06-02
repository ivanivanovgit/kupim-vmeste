// testSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit позволяет нам писать "мутирующий" код, который
      // на самом деле не мутирует состояние, потому что
      // он использует Immer библиотеку под капотом
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;

export default testSlice.reducer;
