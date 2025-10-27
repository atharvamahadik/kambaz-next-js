import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../ReduxExamples.tsx/HelloRedux/helloReducer";
import counterReducer from "../ReduxExamples.tsx/CounterRedux/counterReducer";
import addReducer from "../ReduxExamples.tsx/AddRedux/addReducer";
import todosReducer from "../ReduxExamples.tsx/todos/todosReducer";

const store = configureStore({
    reducer : {helloReducer,
        counterReducer,
        addReducer,
        todosReducer,
    },
});

export default store;