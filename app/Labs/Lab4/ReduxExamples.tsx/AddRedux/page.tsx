// "use client";

// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { Button, FormControl } from "react-bootstrap";

// // --- 1. Reducer ---
// interface AddState {
//   sum: number;
// }

// const initialState: AddState = {
//   sum: 0,
// };

// const addSlice = createSlice({
//   name: "add",
//   initialState,
//   reducers: {
//     add: (state, action: PayloadAction<{ a: number; b: number }>) => {
//       state.sum = action.payload.a + action.payload.b;
//     },
//   },
// });

// const { add } = addSlice.actions;

// // --- 2. Store ---
// const store = configureStore({
//   reducer: {
//     addReducer: addSlice.reducer,
//   },
// });

// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = typeof store.dispatch;

// // --- 3. Component ---
// function AddReduxInner() {
//   const [a, setA] = useState(12);
//   const [b, setB] = useState(23);

//   const sum = useSelector((state: RootState) => state.addReducer.sum);
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <div className="w-25" id="wd-add-redux">
//       <h1>Add Redux</h1>
//       <h2>
//         {a} + {b} = {sum}
//       </h2>
//       <FormControl
//         type="number"
//         value={a}
//         onChange={(e) => setA(Number(e.target.value))}
//       />
//       <FormControl
//         type="number"
//         value={b}
//         onChange={(e) => setB(Number(e.target.value))}
//       />
//       <Button id="wd-add-redux-click" onClick={() => dispatch(add({ a, b }))}>
//         Add Redux
//       </Button>
//       <hr />
//     </div>
//   );
// }

// // --- 4. Export wrapped with Provider ---
// export default function AddRedux() {
//   return (
//     <Provider store={store}>
//       <AddReduxInner />
//     </Provider>
//   );
// }
