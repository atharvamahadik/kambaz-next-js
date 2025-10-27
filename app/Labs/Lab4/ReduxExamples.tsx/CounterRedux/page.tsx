"use client";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

const { increment, decrement } = counterSlice.actions;
const store = configureStore({
  reducer: {
    counterReducer: counterSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
function CounterReduxInner() {
  const count = useSelector((state: RootState) => state.counterReducer.count);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        id="wd-counter-redux-increment-click"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        id="wd-counter-redux-decrement-click"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
export default function CounterRedux() {
  return (
    <Provider store={store}>
      <CounterReduxInner />
    </Provider>
  );
}
