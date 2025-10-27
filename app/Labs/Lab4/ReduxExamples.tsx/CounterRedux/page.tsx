"use client";

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
interface HelloState {
  message: string;
}

const initialState: HelloState = {
  message: "Hello from Redux!",
};

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});

const helloReducer = helloSlice.reducer;

const store = configureStore({
  reducer: {
    helloReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

function HelloReduxInner() {
  const message = useSelector((state: RootState) => state.helloReducer.message);

  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}

export default function HelloRedux() {
  return (
    <Provider store={store}>
      <HelloReduxInner />
    </Provider>
  );
}
