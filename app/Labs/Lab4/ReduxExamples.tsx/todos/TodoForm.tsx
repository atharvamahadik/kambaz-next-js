// import { Button, FormControl, ListGroupItem } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { addTodo, updateTodo, setTodo } from "./todosReducer";

// interface Todo {
//   id: string;
//   title: string;
// }

// interface RootState {
//   todosReducer: {
//     todos: Todo[];
//     todo: Todo | { title: string };
//   };
// }
  

// export default function TodoForm() {
//   const { todo } = useSelector((state: RootState) => state.todosReducer);
//   const dispatch = useDispatch();
//   return (
//     <ListGroupItem className="d-flex align-items-center">
//       <FormControl
//         className="flex-grow-1 me-2"
//         defaultValue={todo.title}
//         onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
//       />
//       <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
//         {" "}
//         Add{" "}
//       </Button>
//       <Button
//         variant="warning"
//         onClick={() => dispatch(updateTodo(todo))}
//         id="wd-update-todo-click"
//       >
//         {" "}
//         Update{" "}
//       </Button>
//     </ListGroupItem>
//   );
// }
