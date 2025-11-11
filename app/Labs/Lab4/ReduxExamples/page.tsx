import AddRedux from "./AddRedux";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux/page";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    return(
        <div>
            <h2>Redux Examples</h2>
            <HelloRedux/>
            <CounterRedux/>
            <AddRedux/>
            <TodoList/>
        </div>
    );
};